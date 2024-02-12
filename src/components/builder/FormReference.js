import { Controller } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/UI/BaseInput";
import HelpCard from "@/components/builder/HelpCard";
import { useHelp } from "@/hooks/useHelp";

export default function FormReference({
  control,
  index,
  remove,
  fieldData,
  references,
  setData,
}) {
  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  const updateResume = (value, index, field) => {
    const fieldName = field.name.split(".").slice(-1)[0];
    const updatedFieldData = references[index] || fieldData;
    const updatedData = { ...updatedFieldData, [fieldName]: value };
    let updatedReferences = [...references];

    if (references[index]) {
      updatedReferences = references.map((ref, idx) => {
        if (idx === index) {
          return updatedData;
        } else {
          return ref;
        }
      });
    } else {
      updatedReferences.push(updatedData);
    }

    setData({ step: 7, data: updatedReferences });
  };

  const removeFromResume = (index) => {
    remove(index);
    references.splice(index, 1);

    setData({ step: 7, data: references });
  };

  return (
    <>
      <Controller
        name={`references.${index}.name`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Nom"
            autoFocus
            onFocus={() => {
              if (index === 0) displayHelp("reference");
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

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-8">
        <div className="sm:col-span-3">
          <Controller
            name={`references.${index}.company`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                label="Entreprise"
                onBlur={(e) => {
                  onBlur(e);
                  updateResume(e.target.value, index, field);
                }}
                {...field}
              />
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <Controller
            name={`references.${index}.position`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                label="Fonction dans l'entreprise"
                onBlur={(e) => {
                  onBlur(e);
                  updateResume(e.target.value, index, field);
                }}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 my-8">
        <div className="sm:col-span-3">
          <Controller
            name={`references.${index}.email`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                label="Email"
                type="email"
                onBlur={(e) => {
                  onBlur(e);
                  updateResume(e.target.value, index, field);
                }}
                {...field}
              />
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <Controller
            name={`references.${index}.tel`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                label="Téléphone"
                type="tel"
                onBlur={(e) => {
                  onBlur(e);
                  updateResume(e.target.value, index, field);
                }}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          color="danger"
          variant="light"
          onPress={() => removeFromResume(index)}
          startContent={<TrashIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Supprimer la référence
        </Button>
      </div>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
