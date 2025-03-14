"use client";
import { useState } from "react";
import Link from "next/link";
import FetchCategories from "../FetchCategories/FetchCategories";
import fixurl from "@/app/utils/Fixurl";

export default function ProductsMenu() {
  const { categories } = FetchCategories();
  const [hovered, setHovered] = useState(false);
  let hoverTimeout;

  let sache = "پک ساشه هیدروژنوس با طعم";
  let powder = "پودر نوشیدنی فوری هیدروژنوس با طعم";
  let temp_link = "";

  return (
    <div
      className="group relative w-max"
      onMouseEnter={() => {
        clearTimeout(hoverTimeout);
        setHovered(true);
      }}
      onMouseLeave={() => {
        hoverTimeout = setTimeout(() => setHovered(false), 500);
      }}
    >
      <Link href={"/products"}>محصولات</Link>
      <div
        className={`absolute left-0 mt-2 bg-white shadow-lg border rounded-md w-auto transition-all duration-300 ease-in-out transform z-20 ${
          hovered
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        onMouseEnter={() => {
          clearTimeout(hoverTimeout);
          setHovered(true);
        }}
        onMouseLeave={() => {
          hoverTimeout = setTimeout(() => setHovered(false), 500);
        }}
      >
        <div className="flex flex-row ">
          {categories.map((top) => {
            const tempLink = top.top_category_id === 1 ? sache : powder;
            return (
              <div
                key={top.top_category_id}
                className=" border border-l-0 rounded-md"
              >
                <h3 className="font-bold text-lg mb-2 hover:cursor-pointer px-10">
                  {top.top_category_name}
                </h3>
                <div className="ml-4">
                  {top.midCategories.map((mid) => (
                    <div
                      key={mid.m_c_id}
                      className="p-1 hover:bg-gray-200 hover:cursor-pointer"
                    >
                      <h4 className="text-md w-full">
                        <Link
                          href={`/product/${fixurl(
                            tempLink + " " + mid.mid_category_name
                          )}`}
                        >
                          {mid.mid_category_name}
                        </Link>
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
