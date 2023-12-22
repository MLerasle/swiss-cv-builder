"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";

import { Container } from "@/components/Container";

export function Cta() {
  return (
    <div className="py-24 sm:py-32">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Prêt à relancer votre carrière ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Commencez dès maintenant la génération de votre nouveau CV.
          </p>
        </div>
        <div className="mt-10 flex items-center justify-center">
          <Link href="/resume/builder">
            <Button color="primary" size="lg">
              Générer mon CV
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
