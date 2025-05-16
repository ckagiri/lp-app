import { Link } from "react-router-dom";
import { ListBase, useCreatePath, useListContext } from "../../frame";

const CompetitionList = () => {
  return (
    <ListBase>
      <CompetitionListView />
    </ListBase>
  );
};

const CompetitionListView = () => {
  const { data, isLoading, resource } = useListContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data?.map(record => (
        <li key={record.id}>
          {record.name}&nbsp;
          <SeasonsLink competitionPath={`${resource.path}/${record.slug}`} />
        </li>
      ))}
    </ul>
  );
};

type SeasonsLinkProps = {
  competitionPath: string;
}

const SeasonsLink = ({ competitionPath }: SeasonsLinkProps) => {
  const createPath = useCreatePath();
  return (
    <Link
      to={createPath({ type: "list", resource: "seasons", parent: competitionPath })}
    >
      Seasons
    </Link>
  );
};

export default CompetitionList;
