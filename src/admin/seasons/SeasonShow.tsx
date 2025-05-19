import { Card, Stack, Typography } from '@mui/material';
import { ShowBase, useShowContext } from '../../frame';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { ListButton } from '../../ui-materialui';

const SeasonShow = () => (
  <ShowBase>
    <SeasonShowView />
  </ShowBase>
);

const SeasonShowView = () => {
  const { record: data, isLoading } = useShowContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card>
        <Stack spacing={1}>
          <div>
            <Typography variant="caption">
              Name
            </Typography>
            <Typography variant="body2">{data.name}</Typography>
          </div>
          <div>
            <Typography variant="caption">
              Current Matchday
            </Typography>
            <Typography variant="body2">
              {data.currentMatchday}
            </Typography>
          </div>
        </Stack>
      </Card>
      <ListButton label="Back" icon={<ChevronLeft />} />
    </div>
  );
};

export default SeasonShow;
