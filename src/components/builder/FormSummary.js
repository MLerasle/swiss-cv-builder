"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

import { BaseEditor } from "@/components/UI/BaseEditor";
import FormActions from "@/components/builder/FormActions";
import HelpCard from "@/components/builder/HelpCard";
import useFormStore from "@/store/useFormStore";
import { useHelp } from "@/hooks/useHelp";

export function FormSummary() {
  const router = useRouter();
  const { summary, setData } = useFormStore();
  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  const { control, handleSubmit } = useForm({ defaultValues: { summary } });

  const updateResume = (summary) => {
    setData({ step: 10, data: summary });
  };

  const onSubmit = (data) => {
    // setData({ step: 10, data: data.summary });
    router.push("/resume/preview");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className="block text-sm font-medium leading-6 text-slate-500 mt-2">
        Expliquez brièvement au recruteur (3 à 5 phrases) pourquoi vous êtes le
        meilleur candidat pour le poste. Résumez les points clés de votre
        parcours professionnel et universitaire, et utilisez des chiffres pour
        illustrer les résultats que vous avez obtenus.
      </span>

      <Controller
        name="summary"
        control={control}
        render={({ field: { onBlur, ref, ...field } }) => (
          <BaseEditor
            label="Résumé"
            initialContent={summary}
            onFocus={() => {
              displayHelp("summary");
            }}
            onBlur={(e) => {
              onBlur(e);
              updateResume(e);
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
