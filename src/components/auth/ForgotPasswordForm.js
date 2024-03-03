"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { BaseInput } from "@/components/UI/BaseInput";
import { BaseNotification } from "@/components/UI/BaseNotification";
import { sendResetPasswordLink } from "@/lib/actions";
import Logo from "@/images/logo.svg";

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
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
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
        <Image
          src={Logo}
          alt="SwissCVBuilder logo"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Mot de passe oublié ?
        </h2>
        <p className="mt-2 text-center text-gray-500">
          Entrez votre email ci-dessous et nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[480px] mt-6">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
}
