"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@nextui-org/react";

import FormActions from "@/components/FormActions";
import useFormStore from "@/store/useFormStore";

export default function Summary() {
  const router = useRouter();
  const { summary, setData } = useFormStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: summary,
  });

  const onSubmit = (data) => {
    setData({ step: 5, data });
    router.push("/resume/preview");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold leading-7 text-gray-900 mt-8">
        7. Résumé
      </h2>
      <p className="text-gray-500 text-sm mt-2">
        Expliquez brièvement au recruteur (3 à 5 phrases) pourquoi vous êtes le
        meilleur candidat pour le poste. Résumez les points clés de votre
        parcours professionnel et universitaire, et utilisez des chiffres pour
        illustrer les résultats que vous avez obtenus.
      </p>

      <Controller
        name="summary"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Textarea
            label="Résumé"
            autoFocus
            isRequired
            className="mt-8"
            {...field}
          />
        )}
      />
      {errors.summary && <span>Summary is missing.</span>}

      <FormActions prevLink="/resume/builder/references" lastStep />
    </form>
  );
}
