"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CircularProgress } from "@nextui-org/react";

import FormSteps from "@/components/FormSteps";
import FormStepTitle from "@/components/FormStepTitle";
import { steps } from "@/lib/form-steps";
import { Container } from "@/components/Container";

export default function BuilderTemplate(props) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const currentStep = steps.find((s) => s.href === pathname);

  // Fix hydration issue with zustand and Next.js
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Container>
      <FormSteps pathname={pathname} />
      <FormStepTitle id={currentStep.id} title={currentStep.name} />
      <section>
        {isClient ? (
          props.children
        ) : (
          <div className="flex justify-center items-center my-32">
            <CircularProgress
              classNames={{
                svg: "w-16 h-16 drop-shadow-md",
              }}
              strokeWidth={4}
              aria-label="Loading..."
            />
          </div>
        )}
      </section>
    </Container>
  );
}
