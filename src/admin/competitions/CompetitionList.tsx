import { ListBase, useListContext } from "../../frame";

export const CompetitionList = () => {
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
          {record.slug}&nbsp;
          {resource.path}
        </li>
      ))}
    </ul>
  );
};
