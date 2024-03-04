"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { BaseNotification } from "@/components/UI/BaseNotification";
import { BaseInput } from "@/components/UI/BaseInput";

export function AuthForm({ page, action }) {
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  // const confirm = searchParams.get("confirm");
  const emailInputRef = useRef();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data) => {
    await action(data);
    setIsFormSubmitted(true);
    reset({ email: "", password: "" });
  };

  return (
    <div className="flex flex-1 flex-col justify-center py-12 md:py-16 lg:py-24 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="my-6 text-center text-3xl font-black leading-9 tracking-tight text-gray-900">
          {page === "signin"
            ? "Content de vous revoir"
            : "Inscrivez-vous pour rejoindre SwissCVBuilder"}
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {isFormSubmitted && error && (
          <BaseNotification type="error" className="mb-6">
            <p>Connexion impossible.</p>
            <p>
              Veuillez vérifier votre email et votre mot de passe et réessayer.
            </p>
          </BaseNotification>
        )}
        {isFormSubmitted && page === "signup" && !error && (
          <BaseNotification type="success" className="mb-6">
            <p>Merci pour votre inscription !</p>
            <p>
              Veuillez cliquer sur le lien contenu dans l'email de confirmation
              que nous vous avons envoyé pour la valider.
            </p>
          </BaseNotification>
        )}
        <div className="bg-white px-6 py-12 sm:px-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              rules={{
                required: true,
              }}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <BaseInput
                  autoFocus
                  ref={emailInputRef}
                  label="Adresse email"
                  placeholder="roger@federer.ch"
                  isInvalid={errors?.email}
                  color={errors?.email ? "danger" : "default"}
                  errorMessage={
                    errors?.email ? "Veuillez saisir votre adresse email" : ""
                  }
                  {...field}
                />
              )}
            />

            <Controller
              name="password"
              rules={{
                required: true,
                minLength: 6,
              }}
              control={control}
              render={({ field: { ...field } }) => (
                <BaseInput
                  type={isVisible ? "text" : "password"}
                  label="Mot de passe"
                  placeholder="********"
                  isInvalid={errors?.password}
                  color={errors?.password ? "danger" : "default"}
                  errorMessage={
                    errors?.password && errors?.password?.type === "required"
                      ? "Veuillez saisir votre mot de passe"
                      : errors?.password &&
                        errors?.password?.type === "minLength"
                      ? "Votre mot de passe doit contenir au moins 8 caractères"
                      : ""
                  }
                  className="mt-12"
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

            <div className="text-sm leading-6 text-gray-600 mt-3">
              {page === "signup" ? (
                <p>Votre mot doit contenir au moins 8 caractères.</p>
              ) : (
                <Link
                  href="/forgot-password"
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  Mot de passe oublié ?
                </Link>
              )}
            </div>

            <Button
              type="submit"
              color="primary"
              size="lg"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="w-full mt-12"
            >
              {page === "signin" ? "Se connecter" : "S'inscrire"}
            </Button>
          </form>
        </div>

        <div className="px-6 sm:px-12">
          <div className="border-t border-gray-300">
            {page === "signin" ? (
              <p className="mt-6 text-sm text-gray-500">
                Vous n'avez pas de compte ?{" "}
                <Link
                  href="/signup"
                  className="font-semibold leading-6 text-blue-600 hover:text-blue-500 cursor-pointer"
                >
                  S'inscrire
                </Link>
              </p>
            ) : (
              <p className="mt-6 text-sm text-gray-500">
                Déjà inscrit ?{" "}
                <Link
                  href="signin"
                  className="font-semibold leading-6 text-blue-600 hover:text-blue-500 cursor-pointer"
                >
                  Se connecter
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
