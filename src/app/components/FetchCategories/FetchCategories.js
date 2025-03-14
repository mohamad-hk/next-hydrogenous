"use client"
import { useState, useEffect } from "react";

export default function FetchCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const topRes = await fetch("https://hydrogenous.vercel.app/api/Navbar/TopCategory", { cache: "no-store" });
        const midRes = await fetch("https://hydrogenous.vercel.app/api/Navbar/MidCategory", { cache: "no-store" });
        const prodRes = await fetch("https://hydrogenous.vercel.app/api/Navbar/ProductName", { cache: "no-store" });

        const topCategories = await topRes.json();
        const midCategories = await midRes.json();
        const products = await prodRes.json();

        const structuredData = topCategories.map((top) => {
          return {
            ...top,
            midCategories: midCategories
              .filter((mid) => mid.t_category_id === top.top_category_id)
              .map((mid) => {
                return {
                  ...mid,
                  products: products.filter(
                    (prod) => prod.m_category_id === mid.m_c_id
                  ),
                };
              }),
          };
        });

        setCategories(structuredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { categories, loading };
}
