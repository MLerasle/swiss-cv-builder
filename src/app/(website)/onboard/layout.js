"use client";

import { useState, useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";

import { Container } from "@/components/Container";

export default function BuilderTemplate(props) {
  const [isClient, setIsClient] = useState(false);

  // Fix hydration issue with zustand and Next.js
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="py-24 sm:py-32">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Sélectionnez votre modèle de CV
          </h2>
        </div>
        <section className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
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
    </div>
  );
}
