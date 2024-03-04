"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BaseInput } from "@/components/UI/BaseInput";
import { BaseNotification } from "@/components/UI/BaseNotification";
import { sendResetPasswordLink } from "@/lib/actions";

export function ForgotPasswordForm() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await sendResetPasswordLink(data?.email);
    setIsFormSubmitted(true);
    reset({ email: "" });
  };

  return (
    <div className="flex flex-1 flex-col justify-center py-12 md:py-16 lg:py-24 sm:px-6 lg:px-8">
      <div className="px-6 lg:px-32">
        <Link href="/signin">
          <ArrowLeftIcon className="w-8 h-8 text-gray-900" />
        </Link>
      </div>

      <div className="mx-auto sm:w-full max-w-md sm:max-w-lg">
        {isFormSubmitted && !error && (
          <BaseNotification type="success" className="mb-16 sm:mb-20">
            <p>Un email vient de vous être envoyé.</p>
            <p>
              Veuillez cliquer sur le lien contenu dans celui-ci et suivre les
              instructions pour réinitialiser votre mot de passe.
            </p>
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
        <h2 className="mt-6 text-center text-3xl font-black leading-9 tracking-tight text-gray-900">
          Mot de passe oublié ?
        </h2>
        <p className="mt-2 text-center text-gray-500">
          Entrez votre email ci-dessous et nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl mt-6">
        <div className="bg-white px-6 py-12 sm:px-12">
          <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="roger@federer.ch"
                  isInvalid={errors.email}
                  color={errors.email ? "danger" : "default"}
                  errorMessage={
                    errors.email ? "Veuillez saisir votre adresse email" : ""
                  }
                  {...field}
                />
              )}
            />

            <Button
              type="submit"
              color="primary"
              size="lg"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="w-full"
            >
              Envoyer le lien de réinitialisation
            </Button>
          </form>
        </div>
      </div>

      <p className="mt-24 text-sm text-gray-500 text-center">
        Vous n'avez pas de compte ?{" "}
        <Link
          href="/signup"
          className="font-semibold leading-6 text-blue-600 hover:text-blue-500 cursor-pointer"
        >
          S'inscrire
        </Link>
      </p>
    </div>
  );
}
