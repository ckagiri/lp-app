import { Card, Stack, Typography } from '@mui/material';
import { ShowBase, useShowContext } from '../../frame';

const CompetitionShow = () => (
  <ShowBase>
    <CompetitionShowContent />
  </ShowBase>
);

const CompetitionShowContent = () => {
  const { record: data, isLoading } = useShowContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card>
        <Stack spacing={1}>
          <div>
            <Typography variant="caption" sx={{ display: "block" }}>
              Name
            </Typography>
            <Typography variant="body2">{data.name}</Typography>
          </div>
          <div>
            <Typography variant="caption" sx={{ display: "block" }}>
              Slug
            </Typography>
            <Typography variant="body2">
              {data.slug}
            </Typography>
          </div>
        </Stack>
      </Card>
    </div>
  );
};

export default CompetitionShow;
