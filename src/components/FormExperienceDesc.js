import { useFieldArray, Controller } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";

export default function FormExperienceDesc({ descIndex, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `jobs.${descIndex}.description`,
  });

  const onAddDesc = (event) => {
    if (event.key === "Enter" || event.type === "press") {
      append({ description: "" });
    }
  };

  return (
    <>
      <span className="block text-sm font-medium leading-6 text-gray-900 mt-8">
        Ajoutez une à une les principales tâches et réalisations que vous avez
        réalisées :
      </span>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-1"
        >
          <div className={`sm:col-span-5 ${index > 0 && "mt-8"}`}>
            <Controller
              name={`jobs.${descIndex}.description.${index}.item`}
              control={control}
              render={({ field }) => (
                <Input label="Description" onKeyDown={onAddDesc} {...field} />
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
              >
                Remove Desc
              </Button>
            ) : (
              <Button
                color="primary"
                variant="light"
                type="button"
                onPress={onAddDesc}
              >
                Add Desc
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
