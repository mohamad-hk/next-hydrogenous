"use client";

import { usePathname } from "next/navigation";
import Footer from "../container/Footer";

export default function CheckpathFooter() {
  const pathname = usePathname();

  return (
    <>
      {pathname == "/login" ? null : (
        <>

          <Footer />
        </>
      )}
    </>
  );
}
