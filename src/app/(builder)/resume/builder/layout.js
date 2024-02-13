"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { SectionsNav } from "@/components/builder/SectionsNav";
import { FormNavigation } from "@/components/builder/FormNavigation";
import { ResumePreview } from "@/components/builder/ResumePreview";
import { BaseSpinner } from "@/components/UI/BaseSpinner";
import { useResume } from "@/hooks/useResume";
import Logo from "@/images/logo.svg";

export default function RootLayout(props) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const { sections } = useResume();
  const currentStep = sections.find((s) => s.href === pathname);
  const prevLink = sections.find((s) => s.id === currentStep.id - 1)?.href;
  const nextLink = sections.find((s) => s.id === currentStep.id + 1)?.href;

  // Fix hydration issue with zustand and Next.js
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="flex h-screen w-full">
          {/* Sections Navigation */}
          <div className="hidden md:flex flex-col gap-y-8 overflow-hidden md:z-50 md:w-56 md:bg-slate-800">
            <div className="h-16 z-50 bg-slate-900 shadow flex items-center gap-x-3 px-6">
              <Image
                src={Logo}
                alt="SwissCVBuilder logo"
                className="h-8 w-auto"
              />
              <div className="font-medium leading-8 text-slate-100">
                Swiss<span className="text-blue-700">CV</span>Builder
              </div>
            </div>
            <div className="flex-1 overflow-y-scroll">
              <SectionsNav steps={sections} currentStep={currentStep} />
            </div>
            {/* <div className="bg-slate-900 h-16 z-50">Ajouter une section</div> */}
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="h-16 z-50 shadow flex items-center px-8">
              <h1 className="text-lg font-semibold tracking-wide text-slate-800">
                {currentStep.name}
              </h1>
            </div>

            <div className="flex-1 flex flex-col xl:flex-row w-full overflow-hidden">
              {/* Form Panel */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 px-6 sm:px-8 overflow-y-scroll">
                  {props.children}
                </div>
                <FormNavigation prevLink={prevLink} nextLink={nextLink} />
              </div>

              {/* PDF Panel */}
              <div className="flex-1 hidden sm:block bg-slate-300 overflow-y-scroll">
                <div className="flex flex-col flex-1 justify-center items-center py-8">
                  <ResumePreview />
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
