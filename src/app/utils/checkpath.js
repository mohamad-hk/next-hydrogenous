"use client";

import { usePathname } from "next/navigation";
import Header from "../container/Header";

export default function Checkpath() {
  const pathname = usePathname();
  

  return <>{ pathname=="/login"?null : <Header/>  }</>;
}
