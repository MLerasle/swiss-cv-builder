"use client";

import { useState, useRef } from "react";
import { Button } from "@nextui-org/react";

import { BaseNotification } from "@/components/UI/BaseNotification";
import { BaseInput } from "@/components/UI/BaseInput";
import { FadeIn } from "@/components/FadeIn";

export function NewsletterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const emailRef = useRef();

  async function subsribeToNewsletter(event) {
    event.preventDefault();

    const formData = {
      email: emailRef.current.value,
    };

    try {
      setIsLoading(true);
      const response = await fetch("/api/newsletter", {
        method: "post",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setIsLoading(false);
        setIsFormSubmitted(true);
        throw new Error(`Invalid response: ${response.status}`);
      }
      setIsLoading(false);
      setIsFormSubmitted(true);
      emailRef.current.value = "";
    } catch (err) {
      setIsLoading(false);
      setIsFormSubmitted(true);
      setError(true);
    }
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <FadeIn className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
          {isFormSubmitted && !error && (
            <BaseNotification type="success" className="mb-10 mx-auto max-w-xl">
              <p>
                Votre inscription à la newsletter a bien été prise en compte.
              </p>
            </BaseNotification>
          )}
          {isFormSubmitted && error && (
            <BaseNotification type="error" className="mb-10 mx-auto max-w-xl">
              <p>Une erreur est survenue pendant votre inscription.</p>
              <p>
                Si celle-ci persiste, vous pouvez nous contacter directement à
                l'adresse contact@swisscvbuilder.ch.
              </p>
            </BaseNotification>
          )}
          <FadeIn>
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Inscrivez-vous à la newsletter
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
              Et soyez les premiers informés des futures mises à jour.
            </p>
          </FadeIn>
          <FadeIn>
            <form
              className="mx-auto mt-10 flex max-w-md gap-x-4"
              onSubmit={subsribeToNewsletter}
            >
              <BaseInput
                label="Adresse email"
                type="email"
                name="email"
                autoComplete="email"
                size="sm"
                classNames={{
                  input: "bg-transparent",
                }}
                ref={emailRef}
              />
              <Button
                type="submit"
                size="lg"
                radius="sm"
                className="flex-none bg-white px-3.5 py-2.5 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                isLoading={isLoading}
              >
                S'abonner
              </Button>
            </form>
          </FadeIn>
        </FadeIn>
      </div>
    </div>
  );
}
