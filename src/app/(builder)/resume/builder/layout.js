"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { SectionsNav } from "@/components/builder/SectionsNav";
import FormStepTitle from "@/components/builder/FormStepTitle";
import { ResumePreview } from "@/components/builder/ResumePreview";
import { BaseSpinner } from "@/components/UI/BaseSpinner";
import { useResume } from "@/hooks/useResume";
import Logo from "@/images/logo.svg";

export default function RootLayout(props) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const { sections } = useResume();
  const currentStep = sections.find((s) => s.href === pathname);

  // Fix hydration issue with zustand and Next.js
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="flex min-h-screen w-full">
          {/* Sidebar */}
          <div className="hidden md:flex-none md:inset-y-0 md:left-0 md:z-50 md:block md:w-56 md:bg-slate-800 md:pb-4">
            <div className="flex flex-col gap-y-5">
              <div className="flex-none h-16 sticky top-0 z-50 bg-slate-900 shadow flex items-center gap-x-3 px-6">
                <Image
                  src={Logo}
                  alt="SwissCVBuilder logo"
                  className="h-8 w-auto"
                />
                <div className="font-medium leading-8 text-slate-100">
                  Swiss<span className="text-blue-700">CV</span>Builder
                </div>
              </div>
              <SectionsNav steps={sections} currentStep={currentStep} />
            </div>
          </div>
          {/* Main area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-none h-16 sticky top-0 z-50 bg-white shadow px-8 flex items-center">
              <h1 className="text-lg font-semibold tracking-wide text-slate-800">
                {currentStep.name}
              </h1>
            </div>
            <div className="flex flex-col xl:flex-row relative xl:min-h-screen w-full">
              {/* Form Panel */}
              <div className="flex-1 w-full h-full z-10 overflow-auto xl:absolute xl:top-0 xl:left-0 xl:w-1/2">
                <div className="px-6 sm:px-8">
                  {/* <FormSteps pathname={pathname} /> */}
                  <FormStepTitle
                    id={currentStep.id}
                    title={currentStep.title}
                  />
                  <section>{props.children}</section>
                </div>
              </div>

              {/* PDF Panel */}
              <div className="hidden sm:block flex-1 w-full h-full overflow-auto bg-slate-300 xl:absolute xl:top-0 xl:right-0 xl:w-1/2">
                <div className="flex flex-col flex-1 h-full">
                  <div className="flex flex-col flex-1 justify-center items-center py-12">
                    <ResumePreview />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <BaseSpinner />
        </div>
      )}
    </>
  );
}
