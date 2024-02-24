"use client";

import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { BaseInput } from "@/components/UI/BaseInput";
import { updatePassword } from "@/lib/actions";

export function ChangePasswordForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (data) => {
    startTransition(() => {
      updatePassword(data);
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                ? "Votre mot de passe doit contenir au moins 6 caractères"
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
        disabled={isPending}
        className="w-full"
      >
        Changer le mot de passe
      </Button>
    </form>
  );
}
