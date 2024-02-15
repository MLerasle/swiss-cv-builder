import { Controller } from "react-hook-form";
import { Button, SelectItem } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/UI/BaseInput";
import { BaseSelect } from "@/components/UI/BaseSelect";
import { BaseCheckbox } from "@/components/UI/BaseCheckbox";
import { BaseEditor } from "@/components/UI/BaseEditor";
import { months, years } from "@/lib/select-options";

export default function FormVolunteer({
  control,
  watch,
  index,
  remove,
  fieldData,
  volunteers,
  setData,
}) {
  const updateResume = (value, index, field) => {
    const fieldName = field.name.split(".").slice(-1)[0];
    const updatedFieldData = volunteers[index] || fieldData;
    const updatedData = { ...updatedFieldData, [fieldName]: value };
    let updatedVolunteers = [...volunteers];

    if (volunteers[index]) {
      updatedVolunteers = volunteers.map((pub, idx) => {
        if (idx === index) {
          return updatedData;
        } else {
          return pub;
        }
      });
    } else {
      updatedVolunteers.push(updatedData);
    }

    setData({ step: 12, data: updatedVolunteers });
  };

  const removeFromResume = (index) => {
    remove(index);
    volunteers.splice(index, 1);

    setData({ step: 12, data: volunteers });
  };

  return (
    <>
      <Controller
        name={`volunteers.${index}.organisation`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Organisation"
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
        name={`volunteers.${index}.role`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Fonction"
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
        name={`volunteers.${index}.current`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseCheckbox
            className="mt-8"
            classNames={{
              label: "text-sm leading-6 text-gray-700",
            }}
            defaultSelected={watch(`volunteers.${index}.current`)}
            onBlur={(e) => {
              onBlur(e);
              updateResume(e.target.value, index, field);
            }}
            {...field}
          >
            Je suis actuellement bénévole à ce poste
          </BaseCheckbox>
        )}
      />

      <span className="block text-sm font-medium leading-6 text-gray-900 mt-8">
        Date de début
      </span>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-1">
          <Controller
            name={`volunteers.${index}.fromMonth`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Mois"
                defaultSelectedKeys={
                  !!watch(`volunteers.${index}.fromMonth`)
                    ? [watch(`volunteers.${index}.fromMonth`)]
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
            name={`volunteers.${index}.fromYear`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Année"
                defaultSelectedKeys={
                  !!watch(`volunteers.${index}.fromYear`)
                    ? [watch(`volunteers.${index}.fromYear`)]
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

      <span className="block text-sm font-medium leading-6 text-gray-900 mt-8">
        Date de fin
      </span>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-1">
          <Controller
            name={`volunteers.${index}.toMonth`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Mois"
                isDisabled={watch(`volunteers.${index}.current`)}
                defaultSelectedKeys={
                  watch(`volunteers.${index}.current`) ||
                  !watch(`volunteers.${index}.toMonth`)
                    ? []
                    : [watch(`volunteers.${index}.toMonth`)]
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
            name={`volunteers.${index}.toYear`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Année"
                isDisabled={watch(`volunteers.${index}.current`)}
                defaultSelectedKeys={
                  watch(`volunteers.${index}.current`) ||
                  !watch(`volunteers.${index}.toYear`)
                    ? []
                    : [watch(`volunteers.${index}.toYear`)]
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
          name={`volunteers.${index}.description`}
          control={control}
          render={({ field: { onBlur, ref, ...field } }) => (
            <BaseEditor
              label="Description"
              initialContent={
                volunteers?.length > 0
                  ? volunteers[index]?.description
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
          Supprimer le bénévolat
        </Button>
      </div>
    </>
  );
}
