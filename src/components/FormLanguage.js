import { Controller } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";

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
              <Input label="Language" isRequired {...field} />
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
              <Input label="Level" isRequired {...field} />
            )}
          />
          {errors.level && <span>Level is missing.</span>}
        </div>

        <div className="sm:col-span-2 flex justify-center items-center">
          <Button color="danger" variant="light" onPress={() => remove(index)}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
