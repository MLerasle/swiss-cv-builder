import { Controller } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function FormLanguage({ control, errors, index, remove }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 mt-8">
        <div className="sm:col-span-5">
          <Controller
            name={`languages.${index}.language`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input label="Langue" isRequired {...field} />
            )}
          />
          {errors.language && <span>Language is missing.</span>}
        </div>

        <div className="sm:col-span-5">
          <Controller
            name={`languages.${index}.level`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input label="Niveau" isRequired {...field} />
            )}
          />
          {errors.level && <span>Level is missing.</span>}
        </div>

        <div className="sm:col-span-2 flex justify-center items-center">
          <Button
            color="danger"
            aria-label="Delete"
            variant="light"
            onPress={() => remove(index)}
            startContent={<TrashIcon className="w-4 h-4" aria-hidden="true" />}
          >
            Supprimer
          </Button>
        </div>
      </div>
    </>
  );
}
