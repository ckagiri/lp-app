import React from "react";
import { ListBase, useListContext } from "../../frame";

const MatchList = () => {
  return (
    <ListBase>
      <MatchListView />
    </ListBase>
  );
};

const MatchListView = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data?.map(({ id, homeTeam, awayTeam }) => (
        <li key={id}>
          {homeTeam.name} vs {awayTeam.name}
        </li>
      ))}
    </ul>
  );
};

export default MatchList;
