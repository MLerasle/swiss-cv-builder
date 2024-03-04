"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { BaseInput } from "@/components/UI/BaseInput";
import { BaseNotification } from "@/components/UI/BaseNotification";
import { updatePassword } from "@/lib/actions";

export function ChangePasswordForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data) => {
    await updatePassword(data?.password);
    setIsFormSubmitted(true);
    reset({ password: "" });
  };

  return (
    <div className="flex flex-1 flex-col justify-center py-12 md:py-16 lg:py-24 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {isFormSubmitted && !error && (
          <BaseNotification type="success" className="mb-16 sm:mb-20">
            <p>Votre mot de passe a bien été enregistré.</p>
            <p>Vous pouvez maintenant accéder à votre compte.</p>
          </BaseNotification>
        )}
        {isFormSubmitted && error && (
          <BaseNotification type="error" className="mb-16 sm:mb-20">
            <p>
              Une erreur est survenue pendant la réinitialisation de votre mot
              de passe.
            </p>
            <p>
              Si celle-ci persiste, vous pouvez nous contacter directement à
              l'adresse contact@swisscvbuilder.ch.
            </p>
          </BaseNotification>
        )}
        <h2 className="mt-6 text-center text-3xl font-black leading-9 tracking-tight text-gray-900">
          Modifiez votre mot de passe
        </h2>
        <p className="mt-2 text-center text-gray-500">
          Entrez votre nouveau mot de passe ci-dessous.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl mt-6">
        <div className="bg-white px-6 py-12 sm:px-12">
          <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="password"
              rules={{
                required: true,
                minLength: 6,
              }}
              control={control}
              render={({ field: { ...field } }) => (
                <BaseInput
                  autoFocus
                  type={isVisible ? "text" : "password"}
                  label="Mot de passe"
                  placeholder="Saisissez votre nouveau mot de passe"
                  isInvalid={errors?.password}
                  color={errors?.password ? "danger" : "default"}
                  errorMessage={
                    errors?.password?.type === "required"
                      ? "Veuillez saisir un nouveau mot de passe"
                      : errors?.password?.type === "minLength"
                      ? "Votre mot de passe doit contenir au moins 8 caractères"
                      : ""
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashIcon className="w-5 h-5 text-default-400 pointer-events-none" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-default-400 pointer-events-none" />
                      )}
                    </button>
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
              Changer le mot de passe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
