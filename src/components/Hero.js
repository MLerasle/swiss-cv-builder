"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";

import { Container } from "@/components/Container";

export function Hero() {
  return (
    <Container className="py-24 sm:py-32 text-center">
      <h1 className="mx-auto max-w-5xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Créez{" "}
        <span className="relative whitespace-nowrap text-blue-600">
          <span className="relative">votre CV Suisse</span>
        </span>{" "}
        en 5 minutes.
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
        Vous souhaitez décrocher un emploi en Suisse ? Utilisez notre générateur
        de CV pour répondre aux attentes des recruteurs.
      </p>
      <div className="mt-10">
        <Link href="/resume/builder/personal-infos">
          <Button color="primary" size="lg">
            Générer mon CV
          </Button>
        </Link>
      </div>
    </Container>
  );
}
