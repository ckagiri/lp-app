import { Frame } from "./Frame";
import { CompetitionList } from "../admin/competitions/CompetitionList";
import { AdminRoutes, Resource } from "../frame";

const AppFrame = () => (
  <Frame>
    <AdminRoutes>
      <Resource
        name="competitions"
        route="competitions"
        list={CompetitionList}
      />
    </AdminRoutes>
  </Frame>
);

export default AppFrame;