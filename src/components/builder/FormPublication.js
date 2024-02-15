import { Controller } from "react-hook-form";
import { Button, SelectItem } from "@nextui-org/react";
import { TrashIcon, LinkIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/UI/BaseInput";
import { BaseSelect } from "@/components/UI/BaseSelect";
import { BaseEditor } from "@/components/UI/BaseEditor";
import { months, years } from "@/lib/select-options";

export default function FormPublication({
  control,
  watch,
  index,
  remove,
  fieldData,
  publications,
  setData,
}) {
  const updateResume = (value, index, field) => {
    const fieldName = field.name.split(".").slice(-1)[0];
    const updatedFieldData = publications[index] || fieldData;
    const updatedData = { ...updatedFieldData, [fieldName]: value };
    let updatedPublications = [...publications];

    if (publications[index]) {
      updatedPublications = publications.map((pub, idx) => {
        if (idx === index) {
          return updatedData;
        } else {
          return pub;
        }
      });
    } else {
      updatedPublications.push(updatedData);
    }

    setData({ step: 11, data: updatedPublications });
  };

  const removeFromResume = (index) => {
    remove(index);
    publications.splice(index, 1);

    setData({ step: 11, data: publications });
  };

  return (
    <>
      <Controller
        name={`publications.${index}.title`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Titre"
            autoFocus
            onBlur={(e) => {
              onBlur(e);
              updateResume(e.target.value, index, field);
            }}
            {...field}
          />
        )}
      />

      <Controller
        name={`publications.${index}.editor`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Publication / Éditeur"
            className="mt-8"
            onBlur={(e) => {
              onBlur(e);
              updateResume(e.target.value, index, field);
            }}
            {...field}
          />
        )}
      />

      <Controller
        name={`publications.${index}.link`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="URL de la publication"
            className="mt-8"
            startContent={<LinkIcon className="w-4 h-4" />}
            onBlur={(e) => {
              onBlur(e);
              updateResume(e.target.value, index, field);
            }}
            {...field}
          />
        )}
      />

      <span className="block text-sm font-medium leading-6 text-gray-900 mt-8">
        Date de la publication
      </span>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-1">
          <Controller
            name={`publications.${index}.month`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Mois"
                defaultSelectedKeys={
                  !!watch(`publications.${index}.month`)
                    ? [watch(`publications.${index}.month`)]
                    : []
                }
                onBlur={(e) => {
                  onBlur(e);
                  updateResume(e.target.value, index, field);
                }}
                {...field}
              >
                {months.map((month) => (
                  <SelectItem key={month.num} value={month.num}>
                    {month.name}
                  </SelectItem>
                ))}
              </BaseSelect>
            )}
          />
        </div>

        <div className="sm:col-span-3 mt-8 sm:mt-1">
          <Controller
            name={`publications.${index}.year`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Année"
                defaultSelectedKeys={
                  !!watch(`publications.${index}.year`)
                    ? [watch(`publications.${index}.year`)]
                    : []
                }
                onBlur={(e) => {
                  onBlur(e);
                  updateResume(e.target.value, index, field);
                }}
                {...field}
              >
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </BaseSelect>
            )}
          />
        </div>
      </div>

      <div className="my-8 relative">
        <Controller
          name={`publications.${index}.description`}
          control={control}
          render={({ field: { onBlur, ref, ...field } }) => (
            <BaseEditor
              label="Description"
              initialContent={
                publications?.length > 0
                  ? publications[index]?.description
                  : fieldData.description
              }
              onBlur={(e) => {
                onBlur(e);
                updateResume(e, index, field);
              }}
              {...field}
            />
          )}
        />
      </div>

      <div className="flex justify-end mt-8">
        <Button
          color="danger"
          variant="light"
          onPress={() => removeFromResume(index)}
          startContent={<TrashIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Supprimer la publication
        </Button>
      </div>
    </>
  );
}
