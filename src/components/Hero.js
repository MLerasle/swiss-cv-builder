"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";

import { FadeIn } from "@/components/FadeIn";
import heroImg from "@/images/resume.svg";

export function Hero() {
  return (
    <FadeIn className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20">
        <div className="mx-auto max-w-7xl py-24 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl lg:max-w-none lg:flex lg:flex-col lg:justify-center px-6 sm:px-0">
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
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-blue-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-blue-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                  aria-hidden="true"
                />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-slate-100">
                      <Image src={heroImg} alt="CV suisse en ligne" />
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </FadeIn>
  );
}
