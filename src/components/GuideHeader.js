"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@nextui-org/react";

export function GuideHeader({ guide }) {
  return (
    <header className="py-24 lg:py-36 bg-slate-50 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div className="flex flex-col justify-center max-w-2xl mx-auto lg:max-w-none">
          <h1 className="text-5xl text-slate-800 font-bold leading-tight">
            {guide.metadata.title}
          </h1>
          <p className="mt-8 text-xl text-slate-800 leading-8">
            {guide.metadata.description}
          </p>
          <p className="mt-6 text-blue-600 text-sm font-semibold">
            Mis à jour le {guide.metadata.date}
          </p>
          <Link href="/onboard" className="mt-8">
            <Button color="primary" size="lg" radius="full">
              Rédiger mon CV
            </Button>
          </Link>
        </div>

        <div className="mt-24 lg:mt-0 flex items-center justify-center lg:justify-end">
          <Image
            alt={guide.metadata.title}
            src={`/images/guides/${guide.slug}.svg`}
            width={500}
            height={540}
          />
        </div>
      </div>
    </header>
  );
}
