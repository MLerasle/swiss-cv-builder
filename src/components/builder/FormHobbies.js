"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/UI/BaseInput";
import HelpCard from "@/components/builder/HelpCard";
import useFormStore, { hobbyData } from "@/store/useFormStore";
import { useHelp } from "@/hooks/useHelp";

export function FormHobbies() {
  const { hobbies, setData } = useFormStore();

  const { control } = useForm({
    defaultValues: { hobbies },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

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

    updatedHobbies = updatedHobbies.filter((h) => h.hobby !== "");
    setData({ step: 9, data: updatedHobbies });
  };

  const removeFromResume = (index) => {
    remove(index);
    hobbies.splice(index, 1);
    setData({ step: 4, data: hobbies });
  };

  return (
    <>
      <form>
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
              onPress={() => removeFromResume(index)}
              startContent={
                <TrashIcon className="h-4 w-4" aria-hidden="true" />
              }
            >
              Supprimer
            </Button>
          </div>
        ))}

        <div className="my-8 py-3 border-y-1 border-slate-400 border-dashed">
          <Button
            color="primary"
            variant="light"
            type="button"
            onPress={onAddHobby}
            startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
          >
            Ajouter un hobby
          </Button>
        </div>
      </form>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
