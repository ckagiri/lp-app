import { AppFrame } from "./AppFrame";
import { CompetitionList } from "../admin/competitions/CompetitionList";
import { Admin, AppRoutes, Resource } from "../frame";
import { Navigate, Route } from "react-router-dom";

const Ligi = () => (
  <AppFrame>
    <AppRoutes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </AppRoutes>
    <Admin>
      <Resource
        name="competitions"
        route="competitions"
        list={CompetitionList}
      />
    </Admin>
  </AppFrame>
);

export default Ligi;