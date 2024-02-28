"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";

import { BaseInput } from "@/components/UI/BaseInput";
import { BaseTextarea } from "@/components/UI/BaseTextarea";
import { sendContactMessage } from "@/lib/actions";
import { BaseNotification } from "@/components/UI/BaseNotification";
import { scrollToElement } from "@/lib/scroll";

export function ContactForm() {
  const [error, setError] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    reset({
      email: "",
      message: "",
    });
  }, [isSubmitSuccessful]);

  const onSubmit = async (data) => {
    const { error } = await sendContactMessage(data);
    scrollToElement("formContainer");
    setIsFormSubmitted(true);
    if (error) {
      setError(true);
    }
  };

  return (
    <div className="px-6 py-24 sm:py-32 lg:px-8" id="formContainer">
      <div className="mx-auto max-w-2xl text-center">
        {isFormSubmitted && !error && (
          <BaseNotification type="success" className="mb-16 sm:mb-20">
            <p>Votre message a bien été envoyé.</p>
            <p>Nous reviendrons vers vous le plus rapidement possible.</p>
          </BaseNotification>
        )}
        {isFormSubmitted && error && (
          <BaseNotification type="error" className="mb-16 sm:mb-20">
            <p>Une erreur est survenue pendant l'envoi de votre message.</p>
            <p>
              Si celle-ci persiste, vous pouvez nous contacter directement à
              l'adresse contact@swisscvbuilder.ch.
            </p>
          </BaseNotification>
        )}
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contactez-nous
        </h2>
        <p className="mt-2 sm:mt-4 text-lg leading-8 text-gray-600">
          Si vous rencontrez des problèmes ou souhaitez me soumettre des idées
          d'amélioration, veuillez utiliser le formulaire ci-dessous.
        </p>
      </div>
      <form
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <Controller
                name="email"
                rules={{
                  required: true,
                }}
                control={control}
                render={({ field: { ...field } }) => (
                  <BaseInput
                    autoFocus
                    label="Adresse email"
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
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <Controller
                name="message"
                rules={{
                  required: true,
                }}
                control={control}
                render={({ field: { ...field } }) => (
                  <BaseTextarea
                    label="Message"
                    name="message"
                    id="message"
                    minRows={6}
                    isInvalid={errors?.message}
                    color={errors?.message ? "danger" : "default"}
                    errorMessage={
                      errors?.message ? "Veuillez saisir votre message" : ""
                    }
                    autoComplete="message"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
          >
            Envoyer le message
          </Button>
        </div>
      </form>
    </div>
  );
}
