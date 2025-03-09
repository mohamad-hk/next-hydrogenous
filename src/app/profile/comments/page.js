"use client"
import { AuthContext } from "@/app/context/AuthContext";
import { useContext, useEffect, useState } from "react";

const ProfileComments = () => {
  const [addresses, setAddresses] = useState([]);
  const { user } = useContext(AuthContext);

  const getAddresses = async (input_params) => {
    try {
      const data = await fetch(
        `http://localhost:3000/api/Shipments/GetShipment?${input_params}`
      );
      const response = await data.json();
      setAddresses(response);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const input_params = new URLSearchParams({
        cust_id: user.customer_id,
      });
      getAddresses(input_params);
    }
  }, [user]);
    return ( 
        <>
        
        </>
     );
}
 
export default ProfileComments;