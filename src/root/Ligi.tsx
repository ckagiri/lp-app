import { AppFrame } from "./AppFrame";
import { CompetitionList } from "../admin/competitions/CompetitionList";
import { Admin, AppRoutes, Resource } from "../frame";
import { Navigate, Route } from "react-router-dom";
import simpleRestProvider from "../data-simple-rest";

const API_URL = import.meta.env.VITE_API_URL || "https://nialine.com/api";
const dataProvider = simpleRestProvider(API_URL);

const Ligi = () => (
  <AppFrame
    dataProvider={dataProvider}
  >
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