import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Calendar,
  AppealList,
  AppealDetails,
  DriverList,
  TrafficViolationList,
  TrafficViolationInfo,
  DriverDetails,
} from "@views";
import { NotFound } from "@components";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="calendario" element={<Calendar />} />
      <Route path="administrativo" element={<AppealList statusGroup={"administrativo"} />} />
      <Route path="judicial" element={<AppealList statusGroup={"judicial"} />} />
      <Route path="juridico" element={<AppealList statusGroup={"juridico"} />} />
      <Route path="recursos" element={<AppealList />} />
      <Route path="condutores" element={<DriverList />} />
      <Route path="infracoes" element={<TrafficViolationList />} />
      <Route path="recursos/:id" element={<AppealDetails />} />
      <Route path="condutores/:id" element={<DriverDetails />} />
      <Route path="infracoes/:id" element={<TrafficViolationInfo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
