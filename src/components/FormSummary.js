"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@nextui-org/react";

import FormActions from "@/components/FormActions";
import HelpCard from "@/components/HelpCard";
import useFormStore from "@/store/useFormStore";
import { useHelp } from "@/hooks/useHelp";

export function FormSummary() {
  const router = useRouter();
  const { summary, setData } = useFormStore();
  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { summary } });

  const onSubmit = (data) => {
    setData({ step: 10, data: data.summary });
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
        render={({ field: { onBlur, ...field } }) => (
          <Textarea
            label="Résumé"
            autoFocus
            className="mt-8"
            onFocus={() => displayHelp("summary")}
            onBlur={(e) => {
              onBlur(e);
              hideHelp();
            }}
            {...field}
          />
        )}
      />

      <FormActions prevLink="/resume/builder/hobbies" lastStep />

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </form>
  );
}
