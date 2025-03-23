"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white  backdrop-blur-lg w-80 h-40 rounded-xl shadow-lg flex flex-col items-center justify-center">
        <div className="loader"></div>
      </div>
    </div>
  );
}
