"use client";

import { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { BaseInput } from "@/components/UI/BaseInput";
import { sendResetPasswordLink } from "@/lib/actions";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (email) => {
    startTransition(() => {
      sendResetPasswordLink(email);
    });
  };

  return (
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
        disabled={isPending}
        className="w-full"
      >
        Envoyer le lien de réinitialisation
      </Button>
    </form>
  );
}
