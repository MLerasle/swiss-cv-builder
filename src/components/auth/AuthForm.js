"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { BaseNotification } from "@/components/UI/BaseNotification";
import { Button } from "@nextui-org/react";
import { BaseInput } from "@/components/UI/BaseInput";

export function AuthForm({ login, signup }) {
  const [authAction, setAuthAction] = useState("login");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isPending, startTransition] = useTransition();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    startTransition(() => {
      authAction === "login" ? login(data) : signup(data);
    });
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
      {error && (
        <BaseNotification type="error" className="mb-6">
          <p>Connexion impossible.</p>
          <p>
            Veuillez vérifier votre email et votre mot de passe et réessayer.
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
            render={({ field: { ...field } }) => (
              <BaseInput
                autoFocus
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
            }}
            control={control}
            render={({ field: { ...field } }) => (
              <BaseInput
                type="password"
                label="Mot de passe"
                isInvalid={errors?.password}
                color={errors?.password ? "danger" : "default"}
                errorMessage={
                  errors?.password ? "Veuillez saisir votre mot de passe" : ""
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
            disabled={isPending}
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
            onClick={() => setAuthAction("signup")}
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            S'inscrire
          </a>
        </p>
      ) : (
        <p className="mt-10 text-center text-sm text-gray-500">
          Déjà inscrit ?{" "}
          <a
            onClick={() => setAuthAction("login")}
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            Se connecter
          </a>
        </p>
      )}
    </div>
  );
}
