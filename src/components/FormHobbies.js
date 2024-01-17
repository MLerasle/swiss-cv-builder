"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/BaseInput";
import HelpCard from "@/components/HelpCard";
import FormActions from "@/components/FormActions";
import useFormStore, { hobbyData } from "@/store/useFormStore";
import { useHelp } from "@/hooks/useHelp";

export function FormHobbies() {
  const router = useRouter();
  const { hobbies, setData } = useFormStore();

  const { control, handleSubmit } = useForm({
    defaultValues: { hobbies: hobbies.length > 0 ? hobbies : [hobbyData] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  const onSubmit = (data) => {
    data.hobbies = data.hobbies.filter((h) => h.hobby !== "");
    setData({ step: 9, data: data.hobbies });
    router.push("/resume/builder/summary");
  };

  const onAddHobby = (e) => {
    if (e.key === "Enter") e.preventDefault();
    if (e.key === "Enter" || e.type === "press") {
      append({ hobby: "" });
    }
  };

  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  const updateResume = (value, index, field) => {
    const fieldName = field.name.split(".").slice(-1)[0];
    const updatedFieldData = hobbies[index] || hobbyData;
    const updatedData = { ...updatedFieldData, [fieldName]: value };
    let updatedHobbies = [...hobbies];

    if (hobbies[index]) {
      updatedHobbies = hobbies.map((s, idx) => {
        if (idx === index) {
          return updatedData;
        } else {
          return s;
        }
      });
    } else {
      updatedHobbies.push(updatedData);
    }

    setData({ step: 9, data: updatedHobbies });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="block text-sm font-medium leading-6 text-gray-900 mt-8">
          Ajoutez un à un vos loisirs :
        </span>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center mt-8">
            <Controller
              name={`hobbies.${index}.hobby`}
              control={control}
              render={({ field: { onBlur, ...field } }) => (
                <BaseInput
                  label="Hobby"
                  className="max-w-xl"
                  onKeyDown={onAddHobby}
                  autoFocus
                  onFocus={() => {
                    if (index === 0) displayHelp("hobbies");
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
              onPress={() => remove(index)}
              startContent={
                <TrashIcon className="h-4 w-4" aria-hidden="true" />
              }
            >
              Supprimer
            </Button>
          </div>
        ))}

        <Button
          color="primary"
          variant="bordered"
          type="button"
          className="mt-8"
          onPress={onAddHobby}
          startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Ajouter un hobby
        </Button>

        <FormActions prevLink="/resume/builder/projects" />
      </form>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
