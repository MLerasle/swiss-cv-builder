import { Controller } from "react-hook-form";
import { Button, SelectItem } from "@nextui-org/react";
import { TrashIcon, LinkIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/UI/BaseInput";
import { BaseSelect } from "@/components/UI/BaseSelect";
import { BaseCheckbox } from "@/components/UI/BaseCheckbox";
import { BaseEditor } from "@/components/UI/BaseEditor";
import HelpCard from "@/components/builder/HelpCard";
import { months, years } from "@/lib/select-options";
import { useHelp } from "@/hooks/useHelp";

export default function FormProject({
  control,
  watch,
  index,
  remove,
  fieldData,
  projects,
  setData,
}) {
  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  const updateResume = (value, index, field) => {
    const fieldName = field.name.split(".").slice(-1)[0];
    const updatedFieldData = projects[index] || fieldData;
    const updatedData = { ...updatedFieldData, [fieldName]: value };
    let updatedProjects = [...projects];

    if (projects[index]) {
      updatedProjects = projects.map((proj, idx) => {
        if (idx === index) {
          return updatedData;
        } else {
          return proj;
        }
      });
    } else {
      updatedProjects.push(updatedData);
    }

    setData({ step: 8, data: updatedProjects });
  };

  const removeFromResume = (index) => {
    remove(index);
    projects.splice(index, 1);

    setData({ step: 8, data: projects });
  };

  return (
    <>
      <Controller
        name={`projects.${index}.title`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Nom du projet"
            autoFocus
            onBlur={(e) => {
              onBlur(e);
              updateResume(e.target.value, index, field);
            }}
            {...field}
          />
        )}
      />

      <div className="my-8 relative">
        <Controller
          name={`projects.${index}.description`}
          control={control}
          render={({ field: { onBlur, ref, ...field } }) => (
            <BaseEditor
              label="Description"
              initialContent={
                projects?.length > 0
                  ? projects[index]?.description
                  : fieldData.description
              }
              onFocus={() => {
                displayHelp("projectDesc");
              }}
              onBlur={(e) => {
                onBlur(e);
                updateResume(e, index, field);
              }}
              {...field}
            />
          )}
        />
      </div>

      <Controller
        name={`projects.${index}.link`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Lien vers le projet"
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

      <Controller
        name={`projects.${index}.current`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseCheckbox
            className="mt-8"
            classNames={{
              label: "text-sm leading-6 text-gray-700",
            }}
            defaultSelected={watch(`projects.${index}.current`)}
            onBlur={(e) => {
              onBlur(e);
              updateResume(e.target.value, index, field);
            }}
            {...field}
          >
            Je travaille actuellement sur ce projet
          </BaseCheckbox>
        )}
      />

      <span className="block text-sm font-medium leading-6 text-gray-900 mt-8">
        Date de début
      </span>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-1">
          <Controller
            name={`projects.${index}.fromMonth`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Mois"
                defaultSelectedKeys={
                  !!watch(`projects.${index}.fromMonth`)
                    ? [watch(`projects.${index}.fromMonth`)]
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
            name={`projects.${index}.fromYear`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Année"
                defaultSelectedKeys={
                  !!watch(`projects.${index}.fromYear`)
                    ? [watch(`projects.${index}.fromYear`)]
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
            name={`projects.${index}.toMonth`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Mois"
                isDisabled={watch(`projects.${index}.current`)}
                defaultSelectedKeys={
                  watch(`projects.${index}.current`) ||
                  !watch(`projects.${index}.toMonth`)
                    ? []
                    : [watch(`projects.${index}.toMonth`)]
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
            name={`projects.${index}.toYear`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Année"
                isDisabled={watch(`projects.${index}.current`)}
                defaultSelectedKeys={
                  watch(`projects.${index}.current`) ||
                  !watch(`projects.${index}.toYear`)
                    ? []
                    : [watch(`projects.${index}.toYear`)]
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

      <div className="flex justify-end mt-8">
        <Button
          color="danger"
          variant="light"
          onPress={() => removeFromResume(index)}
          startContent={<TrashIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Supprimer le projet
        </Button>
      </div>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
