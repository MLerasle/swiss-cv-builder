import { useFieldArray, Controller } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import HelpCard from "@/components/HelpCard";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

import { useHelp } from "@/hooks/useHelp";

export default function FormExperienceDesc({ descIndex, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `jobs.${descIndex}.description`,
  });

  const onAddDesc = (event) => {
    if (event.key === "Enter" || event.type === "press") {
      append({ task: "" });
    }
  };

  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  return (
    <>
      <span className="block text-sm font-medium leading-6 text-gray-900 mt-8">
        Ajoutez une à une les principales tâches qui vous étaient assignées
        ainsi que vos réalisations :
      </span>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-1"
        >
          <div className={`sm:col-span-5 ${index > 0 && "mt-8"}`}>
            <Controller
              name={`jobs.${descIndex}.description.${index}.task`}
              control={control}
              render={({ field: { onBlur, ...field } }) => (
                <Input
                  label="Description"
                  onKeyDown={onAddDesc}
                  onFocus={() => {
                    if (index === 0) displayHelp("jobExpDesc");
                  }}
                  onBlur={(e) => {
                    onBlur(e);
                    hideHelp();
                  }}
                  {...field}
                />
              )}
            />
          </div>
          <div
            className={`sm:col-span-1 ${
              index > 0 && "mt-8"
            } flex justify-center items-center`}
          >
            {fields.length > 1 && fields.length !== index + 1 ? (
              <Button
                color="danger"
                variant="light"
                type="button"
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
                onPress={onAddDesc}
                startContent={
                  <PlusIcon className="h-4 w-4" aria-hidden="true" />
                }
              >
                Ajouter
              </Button>
            )}
          </div>
        </div>
      ))}

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
