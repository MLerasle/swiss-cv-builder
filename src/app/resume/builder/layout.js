"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import FormSteps from "@/components/FormSteps";
import FormStepTitle from "@/components/FormStepTitle";
import { steps } from "@/lib/form-steps";

export default function BuilderTemplate(props) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const currentStep = steps.find((s) => s.href === pathname);

  // Fix hydration issue with zustand and Next.js
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <FormSteps pathname={pathname} />
      <FormStepTitle id={currentStep.id} title={currentStep.name} />
      <section>{isClient ? props.children : ""}</section>
    </>
  );
}
