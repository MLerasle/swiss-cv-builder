"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/UI/BaseInput";
import HelpCard from "@/components/builder/HelpCard";
import useFormStore, { skillData } from "@/store/useFormStore";
import { useHelp } from "@/hooks/useHelp";

export function FormSkills() {
  const { skills, setData } = useFormStore();
  const { control } = useForm({ defaultValues: { skills } });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onAddSkill = (e) => {
    if (e.key === "Enter") e.preventDefault();
    if (e.key === "Enter" || e.type === "press") {
      append({ skill: "" });
    }
  };

  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  const updateResume = (value, index, field) => {
    const fieldName = field.name.split(".").slice(-1)[0];
    const updatedFieldData = skills[index] || skillData;
    const updatedData = { ...updatedFieldData, [fieldName]: value };
    let updatedSkills = [...skills];

    if (skills[index]) {
      updatedSkills = skills.map((s, idx) => {
        if (idx === index) {
          return updatedData;
        } else {
          return s;
        }
      });
    } else {
      updatedSkills.push(updatedData);
    }

    updatedSkills = updatedSkills.filter((s) => s.skill !== "");
    setData({ step: 3, data: updatedSkills });
  };

  const removeFromResume = (index) => {
    remove(index);
    skills.splice(index, 1);
    setData({ step: 3, data: skills });
  };

  return (
    <>
      <form className="my-8">
        <h2 className="font-medium leading-6 text-slate-800">
          Ajoutez une à une les compétences que vous souhaitez mettre en avant.
        </h2>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center mt-8">
            <Controller
              name={`skills.${index}.skill`}
              control={control}
              render={({ field: { onBlur, ...field } }) => (
                <BaseInput
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
                    updateResume(e.target.value, index, field);
                  }}
                  {...field}
                />
              )}
            />
            <Button
              color="danger"
              variant="light"
              type="button"
              className="ml-2"
              onPress={() => removeFromResume(index)}
              startContent={
                <TrashIcon className="h-4 w-4" aria-hidden="true" />
              }
            >
              Supprimer
            </Button>
          </div>
        ))}

        <div className="mt-8 py-3 border-y-1 border-slate-400 border-dashed">
          <Button
            color="primary"
            variant="light"
            type="button"
            onPress={onAddSkill}
            startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
          >
            Ajouter une compétence
          </Button>
        </div>
      </form>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
