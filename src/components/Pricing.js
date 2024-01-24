"use client";

import Link from "next/link";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";

import { Container } from "@/components/Container";

const tiers = [
  {
    name: "Premium",
    id: "tier-premium",
    href: "#",
    priceMonthly: "14.90",
    description:
      "Le plan idéal pour vous démarquer de la concurrence et décrocher votre emploi en Suisse.",
    features: [
      "Génération du CV",
      "Aide en ligne",
      "5 modèles de CV",
      "Personnalisation du modèle de CV",
      "Support",
    ],
    featured: true,
  },
  {
    name: "Basique",
    id: "tier-basic",
    href: "#",
    priceMonthly: "4.90",
    description:
      "Le plan qui vous permet de générer votre CV Suisse professionnel en quelques minutes.",
    features: ["Génération du CV", "Aide en ligne", "1 modèle de CV"],
    featured: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Pricing() {
  return (
    <div id="pricing" className="bg-slate-50 py-24 sm:py-32">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Combien ça coûte ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Vous pouvez générer votre CV gratuitement, ou profiter de notre
            offre premium pour un plus large choix.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured
                  ? "relative bg-white shadow-2xl"
                  : "bg-white/60 sm:mx-8 lg:mx-0",
                tier.featured
                  ? ""
                  : tierIdx === 0
                  ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                  : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
                "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
              )}
            >
              <h3
                id={tier.id}
                className="text-base font-semibold leading-7 text-blue-600"
              >
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-4xl text-gray-900">CHF</span>
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  {tier.priceMonthly}
                </span>
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                {tier.description}
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-blue-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/resume/builder" className="mt-8 block">
                <Button
                  color="primary"
                  className="block w-full"
                  radius="full"
                  variant={tier.featured ? "solid" : "bordered"}
                >
                  Rédiger mon CV
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
