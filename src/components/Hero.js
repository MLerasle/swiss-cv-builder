"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";

import { FadeIn } from "@/components/FadeIn";
import heroImg from "@/images/resume.svg";

export function Hero() {
  return (
    <FadeIn className="bg-white">
      <div className="mx-auto px-6 py-16 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none lg:flex lg:flex-col lg:justify-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Générateur de CV Suisse en ligne
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Créez votre CV en quelques minutes grâce à notre outil intuitif.
          </p>
          <div className="mt-10">
            <Link href="/onboard">
              <Button color="primary" size="lg" radius="full">
                Rédiger mon CV
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <Image
              src={heroImg}
              alt="CV suisse en ligne"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
