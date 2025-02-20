"use client";

import { usePathname } from "next/navigation";
import ProfileNavbar from "../components/Profile/Navbar";

export default function Checkpathdashboard() {
  const pathname = usePathname();

  return <>{pathname.startsWith("/profile/orders/") ? null : <ProfileNavbar />}</>;
}
