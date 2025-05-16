import React from 'react';
import { ListBase, useCreatePath, useListContext } from '../../frame';
import { Link } from 'react-router-dom';

export const SeasonList = () => {
  return (
    <ListBase>
      <SeasonListView />
    </ListBase>
  );
};


const SeasonListView = () => {
  const { data, isLoading, resource } = useListContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const seasonPath = (seasonSlug: string) => (
    `${resource.path}/${seasonSlug}`
  );

  return (
    <ul>
      {data?.map(record => (
        <li key={record.id}>
          {record.name}&nbsp;
          <RoundsLink seasonPath={seasonPath(record.slug)} />&nbsp;
          <TeamsLink seasonPath={seasonPath(record.slug)} />&nbsp;
        </li>
      ))}
    </ul>
  );
};

type SeasonLinkProps = {
  seasonPath: string;
}

const RoundsLink = ({ seasonPath }: SeasonLinkProps) => {
  const createPath = useCreatePath();
  return (
    <Link
      to={createPath({ type: 'list', resource: 'rounds', parent: seasonPath })}
    >
      Rounds
    </Link>
  )
};

const TeamsLink = ({ seasonPath }: SeasonLinkProps) => {
  const createPath = useCreatePath();
  return (
    <Link
      to={createPath({ type: 'list', resource: 'teams', parent: seasonPath })}
    >
      Teams
    </Link>
  )
};

export default SeasonList;
