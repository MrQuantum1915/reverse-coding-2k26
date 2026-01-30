"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  if (pathname === '/sandbox' || pathname?.startsWith('/sandbox/')) {
    return null;
  }
  
  return <Footer />;
}
