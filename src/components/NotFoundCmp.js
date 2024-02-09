"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";

import { Container } from "@/components/Container";
import notFoundImg from "@/images/not-found.svg";

export function NotFoundCmp() {
  return (
    <Container>
      <section className="flex flex-col justify-center items-center py-16 lg:py-24">
        <Image className="h-96" src={notFoundImg} alt="Page non trouvée" />
        <h1 className="text-4xl font-bold text-slate-900 mt-8">
          Ooops ! Page non trouvée...
        </h1>
        <p className="text-slate-500 my-8">
          Cliquez sur le bouton ci-dessous pour retrouver votre chemin.
        </p>
        <Link href="/">
          <Button color="primary" size="lg" radius="full">
            Retour à l'accueil
          </Button>
        </Link>
      </section>
    </Container>
  );
}
