"use client";

import { AuthProvider } from "../context/AuthContext";

const CheckoutLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-row justify-center items-center bg-gradient-to-r from-[#91EAE4] via-[#86A8E7] to-[#7F7FD5]">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
};

export default CheckoutLayout;
