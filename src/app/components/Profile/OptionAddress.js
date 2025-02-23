"use client";

import { useState, useRef, useEffect } from "react";
import { RiMore2Line } from "react-icons/ri";
import EditAddress from "./EditAddress";

export default function OptionAddress() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <RiMore2Line className="text-2xl cursor-pointer" />
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className="absolute mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <EditAddress id={2} />
            </li>
            <li
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              حذف آدرس
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
