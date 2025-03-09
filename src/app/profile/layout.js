"use client"
import { usePathname } from "next/navigation";
import { DashboardContext } from "../context/dashboard";
import Checkpathdashboard from "../utils/checkpathDashboard";

export default function Layout({ children }) {
  const pathname = usePathname();

  const shouldRemoveLayout = pathname && pathname.includes("/orders/");

  return (
    <DashboardContext>
      {!shouldRemoveLayout ? (
        <div className="grid grid-cols-1 md:grid-cols-[200px_minmax(600px,_1fr)_100px] lg:grid-cols-[200px_minmax(700px,_1fr)_100px] mt-5 mb-10">
          <Checkpathdashboard />
          {children}
        </div>
      ) : (
        children
      )}
    </DashboardContext>
  );
}
