import { Outlet } from "react-router-dom";
import AppWrapper from "../components/app-wrapper";

export default function AppLayout() {
  return (
    <AppWrapper>
      <div className="h-full">
        <Outlet />
      </div>
    </AppWrapper>
  );
}
