"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

import { Card } from "@/components/Card";
import HelpCard from "@/components/HelpCard";
import FormActions from "@/components/FormActions";
import useFormStore from "@/store/useFormStore";
import { useHelp } from "@/hooks/useHelp";

export default function Skills() {
  const router = useRouter();
  const { skills, setData } = useFormStore();

  const { control, handleSubmit } = useForm({ defaultValues: { skills } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = (data) => {
    setData({ step: 3, data: data.skills });
    router.push("/resume/builder/languages");
  };

  const onAddSkill = (event) => {
    if (event.key === "Enter" || event.type === "press") {
      append({ skill: "" });
    }
  };

  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <span className="block text-sm font-medium leading-6 text-gray-900">
            Ajoutez une à une les compétences que vous souhaitez mettre en avant
            :
          </span>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center mt-8">
              <Controller
                name={`skills.${index}.skill`}
                control={control}
                render={({ field: { onBlur, ...field } }) => (
                  <Input
                    label="Compétence"
                    className="max-w-xl"
                    onKeyDown={onAddSkill}
                    autoFocus
                    onFocus={() => {
                      if (index === 0) displayHelp("skills");
                    }}
                    onBlur={(e) => {
                      onBlur(e);
                      hideHelp();
                    }}
                    {...field}
                  />
                )}
              />
              {fields.length > 1 && fields.length !== index + 1 ? (
                <Button
                  color="danger"
                  variant="light"
                  type="button"
                  className="ml-2"
                  onPress={() => remove(index)}
                  startContent={
                    <TrashIcon className="h-4 w-4" aria-hidden="true" />
                  }
                >
                  Supprimer
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="light"
                  type="button"
                  className="ml-2"
                  onPress={onAddSkill}
                  startContent={
                    <PlusIcon className="h-4 w-4" aria-hidden="true" />
                  }
                >
                  Ajouter une compétence
                </Button>
              )}
            </div>
          ))}
        </Card>

        <FormActions prevLink="/resume/builder/experiences" />
      </form>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
