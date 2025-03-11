"use client";

import { AuthProvider } from "../context/AuthContext";

const CheckoutLayout = ({ children }) => {
  return (
    <>
    <div className="h-screen flex flex-row justify-center items-center">
      <AuthProvider>{children}</AuthProvider>

    </div>
    </>
  );
};

export default CheckoutLayout;
