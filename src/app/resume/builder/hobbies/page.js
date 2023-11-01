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

export default function Hobbies() {
  const router = useRouter();
  const { hobbies, setData } = useFormStore();

  const { control, handleSubmit } = useForm({ defaultValues: { hobbies } });

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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <span className="block text-sm font-medium leading-6 text-gray-900">
            Ajoutez un à un vos hobbies :
          </span>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center mt-8">
              <Controller
                name={`hobbies.${index}.hobby`}
                control={control}
                render={({ field: { onBlur, ...field } }) => (
                  <Input
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
        </Card>

        <FormActions prevLink="/resume/builder/projects" />
      </form>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
