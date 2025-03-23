"use client";

import { usePathname } from "next/navigation";
import { FaShoppingCart, FaTruck, FaCheckCircle } from "react-icons/fa";
import { AuthProvider } from "../context/AuthContext";
import { ShipmentProvider } from "../context/ShipmentContext";

const CheckoutLayout = ({ children }) => {
  let currentStep = 0;
  const pathname = usePathname();
  switch (pathname) {
    case "/cart":
      currentStep = 1;
      break;
    case "/shipment":
      currentStep = 2;
      break;
    case "/payment":
      currentStep = 3;
      break;

    default:
      break;
  }
  const steps = [
    { id: 1, name: "سبد خرید", icon: FaShoppingCart },
    { id: 2, name: "جزئیات ارسال", icon: FaTruck },
    { id: 3, name: "تایید سفارش", icon: FaCheckCircle },
  ];
  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-full md:max-w-[90vw] lg:max-w-[95vw] xl:max-w-[75vw] mx-auto p-3 bg-white dark:bg-[#4e76a4] rounded-lg shadow-md flex items-center justify-between fixed md:relative w-full md:w-auto z-20 md:z-0">
          <div className="absolute top-5 left-0 right-0 h-[1px] bg-gray-300 dark:bg-warning-300 mx-10 z-0 overflow-hidden">
            <div
              className="h-full w-1/3 bg-blue-500 transition-all duration-500 ease-in-out"
              style={{ width: `${(currentStep - 1) * 50}%` }}
            ></div>
          </div>
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10 bg-white dark:bg-[#4e76a4]"
            >
              <step.icon
                className={` ${
                  currentStep >= step.id
                    ? "text-blue-500 text-2xl dark:text-warning"
                    : "text-gray-300 text-2xl "
                }`}
              />
              <span className="mt-2 text-sm font-medium">{step.name}</span>
            </div>
          ))}
        </div>

      <AuthProvider>
        <ShipmentProvider>{children}</ShipmentProvider>
      </AuthProvider>
      </div>

    </>
  );
};

export default CheckoutLayout;
