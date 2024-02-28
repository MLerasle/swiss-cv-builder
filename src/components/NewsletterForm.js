"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";

import { BaseNotification } from "@/components/UI/BaseNotification";
import { BaseInput } from "@/components/UI/BaseInput";
import { FadeIn } from "@/components/FadeIn";
import { subsribeToNewsletter } from "@/lib/actions";

export function NewsletterForm() {
  const [error, setError] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    reset({ email: "" });
  }, [isSubmitSuccessful]);

  const onSubmit = async (data) => {
    const response = await subsribeToNewsletter(data);
    console.log({ response });
    setIsFormSubmitted(true);
    if (error) {
      setError(true);
    }
  };

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
              className="mx-auto mt-10 flex items-center max-w-md gap-x-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                rules={{
                  required: true,
                }}
                control={control}
                render={({ field: { ...field } }) => (
                  <BaseInput
                    size="sm"
                    placeholder="Adresse email"
                    isInvalid={errors?.email}
                    color={errors?.email ? "danger" : "default"}
                    errorMessage={
                      errors?.email ? "Veuillez saisir votre adresse email" : ""
                    }
                    autoComplete="email"
                    {...field}
                  />
                )}
              />
              <Button
                type="submit"
                size="lg"
                radius="sm"
                className="flex-none bg-white text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                isLoading={isSubmitting}
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
