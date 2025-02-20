import { DashboardContext } from "../context/dashboard";
import Checkpathdashboard from "../utils/checkpathDashboard";

export default function Layout({ children }) {
  return (
    <DashboardContext>
      <div className="grid grid-cols-[200px_minmax(700px,_1fr)_100px] mt-5 mb-10">
        <Checkpathdashboard />
        {children}
      </div>
    </DashboardContext>
  );
}
