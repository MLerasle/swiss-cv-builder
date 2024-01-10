import Image from "next/image";

import { Container } from "@/components/Container";

import screenshotForm from "@/images/screenshots/screenshot-form.png";
import screenshotTemplate from "@/images/screenshots/screenshot-template.png";
import screenshotPreview from "@/images/screenshots/screenshot-preview.png";

export function Features() {
  return (
    <div id="features" className="py-24 sm:py-32">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Créez votre CV facilement et rapidement
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Pas de logiciel à télécharger. Pas de formulaire d'inscription. Pas
            de tutoriels sans fin. Juste un processus simple.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
          <div className="relative">
            <h3 className="text-xl sm:text-2xl font-semibold leading-7 text-gray-900">
              Choisissez un modèle
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              Choisissez parmi nos modèles de CV conçus à la main et adaptés aux
              attentes des recruteurs suisses.
            </p>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <Image
              className="relative mx-auto sm:rounded-xl"
              src={screenshotTemplate}
              alt=""
              width={600}
              height={400}
              placeholder="blur"
            />
          </div>
        </div>
        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-24 lg:items-center">
            <div className="lg:col-start-2">
              <h3 className="text-xl sm:text-2xl font-semibold leading-7 text-gray-900">
                Saisissez vos informations
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                Remplissez les informations de votre CV en suivant les conseils
                que nous vous fournissons en temps réel.
              </p>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <Image
                className="relative mx-auto sm:rounded-xl"
                src={screenshotForm}
                alt=""
                width={600}
                height={400}
                placeholder="blur"
              />
            </div>
          </div>
        </div>
        <div className="relative mt-12 sm:mt-16 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
          <div className="relative">
            <h3 className="text-xl sm:text-2xl font-semibold leading-7 text-gray-900">
              Téléchargez votre CV
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              C'est prêt ! Il ne vous reste qu'à télécharger votre document !
              Vous pouvez toujours choisir de modifier votre modèle si vous le
              souhaitez.
            </p>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <Image
              className="relative mx-auto sm:rounded-xl"
              src={screenshotPreview}
              alt=""
              width={600}
              height={400}
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
