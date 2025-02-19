"use client";
import Dashboard from "../components/Profile/Dashboard";
import { useDashboard } from "../context/dashboard";
import Addresses from "./addresses/page";
import Orders from "./orders/page";
import PersonalInfo from "./personal-info/page";

const Profile = () => {
  const { activeTab } = useDashboard();
  return (
    <>
        {(() => {
          switch (activeTab) {
            case "dashboard":
              return <Dashboard />;
            case "orders":
              return <Orders />;
            case "addresses":
              return <Addresses />;
            case "personal-info":
              return <PersonalInfo />;
            default:
              return <Dashboard />;
          }
        })()}
    </>
  );
};
export default Profile;
