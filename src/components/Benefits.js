import {
  ClockIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";

const features = [
  {
    name: "Gagnez du temps",
    desc: "Rédiger un CV performant peut être long et fastidieux. Avec SwissCVBuilder, cela ne vous prendra que quelques minutes.",
    icon: ClockIcon,
  },
  {
    name: "Créez un CV professionnel",
    desc: "La mise en forme de votre CV est aussi importante que son contenu. Vous vous occupez du fond, nous nous occupons de la forme.",
    icon: DocumentTextIcon,
  },
  {
    name: "Adapté au marché Suisse",
    desc: "Le marché de l'emploi en Suisse a ses spécificités. SwissCVBuilder vous permet de répondre aux attentes des recruteurs.",
    icon: DocumentCheckIcon,
  },
];

export function Benefits() {
  return (
    <div id="benefits" className="bg-slate-50 py-24 sm:py-32">
      <Container>
        <FadeIn className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Bénéfices pour les chercheurs d'emploi
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Un CV adapté et performant en un rien de temps pour se démarquer de
            la concurrence.
          </p>
        </FadeIn>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <FadeInStagger className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <FadeIn key={feature.name} className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl font-semibold leading-7 text-gray-900 flex flex-col items-center">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </div>
                <div className="mt-4 text-base leading-7 text-gray-600 text-center">
                  <p>{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>
      </Container>
    </div>
  );
}
