import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Calendar,
  AppealList,
  AppealInfo,
  DriverList,
  DriverInfo,
  TrafficViolationList,
  TrafficViolationInfo,
  NotFound,
} from "@views";

// TODO: review path names
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="calendario" element={<Calendar />} />
      <Route path="recursos" element={<AppealList />} />
      <Route path="condutores" element={<DriverList />} />
      <Route path="infracoes" element={<TrafficViolationList />} />
      <Route path="recursos/:id" element={<AppealInfo />} />
      <Route path="condutores/:id" element={<DriverInfo />} />
      <Route path="infracoes/:id" element={<TrafficViolationInfo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
