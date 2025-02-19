import ProfileNavbar from "../components/Profile/Navbar";
import { DashboardContext } from "../context/dashboard";

export default function Layout({ children }) {
  return (
    <DashboardContext>
      <div className="grid grid-cols-[200px_minmax(700px,_1fr)_100px] mt-5 mb-10">
        <ProfileNavbar />
        {children}
      </div>
    </DashboardContext>
  );
}
