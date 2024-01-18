"use client";

import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import { usePathname } from "next/navigation";

import "@/styles/globals.css";
import { Providers } from "@/app/(website)/providers";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import FormSteps from "@/components/builder/FormSteps";
import FormStepTitle from "@/components/builder/FormStepTitle";
import { steps } from "@/lib/form-steps";
import { ResumePreview } from "@/components/builder/ResumePreview";
import { BaseSpinner } from "@/components/UI/BaseSpinner";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout(props) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const currentStep = steps.find((s) => s.href === pathname);

  // Fix hydration issue with zustand and Next.js
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html
      lang="fr"
      className={`h-full scroll-smooth bg-slate-100 antialiased ${roboto.className} relative`}
    >
      <body id="body" className="flex h-full flex-col relative">
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <Providers>
          {isClient ? (
            <div className="flex flex-col xl:flex-row relative xl:min-h-screen w-full">
              {/* Form Panel */}
              <div className="flex-1 w-full h-full z-50 overflow-auto xl:absolute xl:top-0 xl:left-0 xl:w-1/2">
                <div className="px-6 sm:px-8 lg:px-16">
                  <FormSteps pathname={pathname} />
                  <FormStepTitle id={currentStep.id} title={currentStep.name} />
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
          ) : (
            <div className="w-full h-screen flex justify-center items-center">
              <BaseSpinner />
            </div>
          )}
        </Providers>
      </body>
    </html>
  );
}
