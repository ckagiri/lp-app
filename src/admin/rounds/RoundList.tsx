import React from 'react';
import { ListBase, useCreatePath, useListContext } from '../../frame';
import { Link } from 'react-router-dom';

const RoundList = () => {
  return (
    <ListBase>
      <RoundListView />
    </ListBase>
  );
};

type RoundLinkProps = {
  roundPath: string;
}
const MatchesLink = ({ roundPath }: RoundLinkProps) => {
  const createPath = useCreatePath();
  return (
    <Link
      to={createPath({ type: 'list', resource: 'matches', parent: roundPath })}
    >
      Matches
    </Link>
  )
}

const RoundListView = () => {
  const { data, isLoading, resource } = useListContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data?.map(record => (
        <li key={record.id}>
          {record.name}&nbsp;
          <MatchesLink roundPath={`${resource.path}/${record.slug}`} />
        </li>
      ))}
    </ul>
  );
};

export default RoundList;