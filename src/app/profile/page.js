"use client";
import { useContext } from "react";
import Dashboard from "../components/Profile/Dashboard";
import { useDashboard } from "../context/dashboard";
import Addresses from "./addresses/page";
import ProfileComments from "./comments/page";
import Orders from "./orders/page";
import PersonalInfo from "./personal-info/page";
import WishList from "./wish-list/page";
import { AuthContext } from "../context/AuthContext";
const Profile = () => {
  const { activeTab } = useDashboard();
  const {user}=useContext(AuthContext)

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
          case "wish-list":
            return <WishList />;
          case "comments":
            return <ProfileComments />;
          default:
            return <Dashboard />;
        }
      })()}
    </>
  );
};
export default Profile;
