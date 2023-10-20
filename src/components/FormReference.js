import { Controller } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { Card } from "@/components/Card";
import HelpCard from "@/components/HelpCard";
import { useHelp } from "@/hooks/useHelp";

export default function FormReference({ control, errors, index, remove }) {
  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  return (
    <>
      <Card>
        <Controller
          name={`references.${index}.name`}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onBlur, ...field } }) => (
            <Input
              label="Nom"
              autoFocus
              isRequired
              isInvalid={!!errors.references && !!errors.references[index].name}
              errorMessage={
                !!errors.references &&
                !!errors.references[index].name &&
                "Veuillez renseigner le nom de la personne de référence."
              }
              onFocus={() => {
                if (index === 0) displayHelp("reference");
              }}
              onBlur={(e) => {
                onBlur(e);
                hideHelp();
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
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  label="Entreprise"
                  isRequired
                  isInvalid={
                    !!errors.references && !!errors.references[index].company
                  }
                  errorMessage={
                    !!errors.references &&
                    !!errors.references[index].company &&
                    "Veuillez renseigner l'entreprise' de la personne de référence."
                  }
                  {...field}
                />
              )}
            />
          </div>

          <div className="sm:col-span-3">
            <Controller
              name={`references.${index}.position`}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  label="Fonction dans l'entreprise"
                  isRequired
                  isInvalid={
                    !!errors.references && !!errors.references[index].position
                  }
                  errorMessage={
                    !!errors.references &&
                    !!errors.references[index].position &&
                    "Veuillez renseigner le fonction occupée par la personne de référence."
                  }
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
              render={({ field }) => (
                <Input label="Email" type="email" {...field} />
              )}
            />
          </div>

          <div className="sm:col-span-3">
            <Controller
              name={`references.${index}.tel`}
              control={control}
              render={({ field }) => (
                <Input label="Téléphone" type="tel" {...field} />
              )}
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            color="danger"
            variant="light"
            onPress={() => remove(index)}
            startContent={<TrashIcon className="h-4 w-4" aria-hidden="true" />}
          >
            Supprimer la référence
          </Button>
        </div>
      </Card>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
