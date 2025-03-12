"use client";
import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center">
        <Spinner color="primary" className="w-60 md:w-60  lg:w-80 h-16" />
        <p className="mt-4 text-lg font-semibold text-gray-800">در حال بارگذاری...</p>
      </div>
    </div>
  );
}
