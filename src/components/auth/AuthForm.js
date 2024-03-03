"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { BaseNotification } from "@/components/UI/BaseNotification";
import { Button } from "@nextui-org/react";
import { BaseInput } from "@/components/UI/BaseInput";
import Logo from "@/images/logo.svg";

export function AuthForm({ login, signup }) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const confirm = searchParams.get("confirm");
  const emailInputRef = useRef();
  const [authAction, setAuthAction] = useState(confirm ? "signup" : "login");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const toggleAuthAction = () => {
    setAuthAction("signup");
    emailInputRef.current.focus();
  };

  const onSubmit = async (data) => {
    authAction === "login" ? await login(data) : await signup(data);
    setIsFormSubmitted(true);
    reset({ email: "", password: "" });
  };

  return (
    <div className="flex flex-1 flex-col justify-center py-12 md:py-16 lg:py-24 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={Logo}
          alt="SwissCVBuilder logo"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="my-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {authAction === "login"
            ? "Connectez-vous pour créer votre CV Suisse"
            : "Inscrivez-vous pour créer votre CV Suisse"}
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        {isFormSubmitted && error && (
          <BaseNotification type="error" className="mb-6">
            <p>Connexion impossible.</p>
            <p>
              Veuillez vérifier votre email et votre mot de passe et réessayer.
            </p>
          </BaseNotification>
        )}
        {isFormSubmitted && authAction === "signup" && !error && (
          <BaseNotification type="success" className="mb-6">
            <p>Merci pour votre inscription !</p>
            <p>
              Veuillez cliquer sur le lien contenu dans l'email de confirmation
              que nous vous avons envoyé pour la valider.
            </p>
          </BaseNotification>
        )}
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                  type="password"
                  label="Mot de passe"
                  isInvalid={errors?.password}
                  color={errors?.password ? "danger" : "default"}
                  errorMessage={
                    errors?.password && errors?.password?.type === "required"
                      ? "Veuillez saisir votre mot de passe"
                      : errors?.password &&
                        errors?.password?.type === "minLength"
                      ? "Votre mot de passe doit contenir au moins 6 caractères"
                      : ""
                  }
                  {...field}
                />
              )}
            />

            <div className="flex items-center justify-end">
              <div className="text-sm leading-6">
                <Link
                  href="/forgot-password"
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              color="primary"
              size="lg"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="w-full"
            >
              {authAction === "login" ? "Se connecter" : "S'inscrire"}
            </Button>
          </form>
        </div>

        {authAction === "login" ? (
          <p className="mt-10 text-center text-sm text-gray-500">
            Vous n'avez pas de compte ?{" "}
            <a
              onClick={() => toggleAuthAction("signup")}
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              S'inscrire
            </a>
          </p>
        ) : (
          <p className="mt-10 text-center text-sm text-gray-500">
            Déjà inscrit ?{" "}
            <a
              onClick={() => toggleAuthAction("login")}
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Se connecter
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
