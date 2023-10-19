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
  } = useForm({ defaultValues: summary });

  const onSubmit = (data) => {
    setData({ step: 8, data });
    router.push("/resume/preview");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-gray-500 text-sm mt-2">
        Expliquez brièvement au recruteur (3 à 5 phrases) pourquoi vous êtes le
        meilleur candidat pour le poste. Résumez les points clés de votre
        parcours professionnel et universitaire, et utilisez des chiffres pour
        illustrer les résultats que vous avez obtenus.
      </p>

      <Controller
        name="summary"
        control={control}
        render={({ field }) => (
          <Textarea label="Résumé" autoFocus className="mt-8" {...field} />
        )}
      />

      <FormActions prevLink="/resume/builder/references" lastStep />
    </form>
  );
}
