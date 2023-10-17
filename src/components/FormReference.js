import { Controller } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function FormReference({ control, errors, index, remove }) {
  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 my-8">
      <div className="px-4 py-6 sm:p-8">
        <Controller
          name={`references.${index}.name`}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Input label="Nom" autoFocus isRequired {...field} />
          )}
        />
        {errors.name && <span>Name is missing.</span>}

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-8">
          <div className="sm:col-span-3">
            <Controller
              name={`references.${index}.company`}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input label="Entreprise" isRequired {...field} />
              )}
            />
            {errors.company && <span>Company is missing.</span>}
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
                  {...field}
                />
              )}
            />
            {errors.position && <span>Position is missing.</span>}
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
      </div>
    </div>
  );
}
