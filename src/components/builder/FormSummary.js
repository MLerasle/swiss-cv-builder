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

  const onSubmit = () => {
    router.push("/resume/builder/resume-layout");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-medium leading-6 text-slate-800 mt-8">
        Expliquez brièvement au recruteur (3 à 5 phrases) pourquoi vous êtes le
        meilleur candidat pour le poste. Résumez les points clés de votre
        parcours professionnel et universitaire, et utilisez des chiffres pour
        illustrer les résultats que vous avez obtenus.
      </h2>

      <div className="my-8 relative">
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
      </div>

      <FormActions prevLink="/resume/builder/hobbies" />

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </form>
  );
}
