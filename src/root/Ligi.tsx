import { AppFrame } from "./AppFrame";
import { Admin, AppRoutes, Resource } from "../frame";
import { Navigate, Route } from "react-router-dom";
import simpleRestProvider from "../data-simple-rest";
import competitions from "../admin/competitions";
import seasons from "../admin/seasons";
import teams from "../admin/teams";
import rounds from "../admin/rounds";
import matches from "../admin/matches";

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
        list={competitions.list}
        show={competitions.show}
      />
      <Resource
        name="seasons"
        route="competitions/:competition/seasons"
        list={seasons.list}
      />
      <Resource
        name="teams"
        route="competitions/:competition/seasons/:season/teams"
        list={teams.list}
      />
      <Resource
        name="rounds"
        route="competitions/:competition/seasons/:season/rounds"
        list={rounds.list}
      />
      <Resource
        name="matches"
        route="competitions/:competition/seasons/:season/rounds/:round/matches"
        list={matches.list}
      />
    </Admin>
  </AppFrame>
);

export default Ligi;