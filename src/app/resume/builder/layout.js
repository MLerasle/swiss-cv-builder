"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import FormSteps from "@/components/FormSteps";

export default function BuilderTemplate(props) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  // Fix hydration issue with zustand and Next.js
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <FormSteps pathname={pathname} />
      <section>{isClient ? props.children : ""}</section>
    </>
  );
}
