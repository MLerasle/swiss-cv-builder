import { Controller } from "react-hook-form";
import { Button, SelectItem } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/UI/BaseInput";
import { BaseSelect } from "@/components/UI/BaseSelect";
import { BaseCheckbox } from "@/components/UI/BaseCheckbox";
import { BaseEditor } from "@/components/UI/BaseEditor";
import HelpCard from "@/components/builder/HelpCard";
import { months, years } from "@/lib/select-options";
import { useHelp } from "@/hooks/useHelp";

export default function FormExperience({
  control,
  watch,
  index,
  remove,
  fieldData,
  experiences,
  setData,
}) {
  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  const updateResume = (value, index, field) => {
    const fieldName = field.name.split(".").slice(-1)[0];
    const updatedFieldData = experiences[index] || fieldData;
    const updatedData = { ...updatedFieldData, [fieldName]: value };
    let updatedExperiences = [...experiences];

    if (experiences[index]) {
      updatedExperiences = experiences.map((exp, idx) => {
        if (idx === index) {
          return updatedData;
        } else {
          return exp;
        }
      });
    } else {
      updatedExperiences.push(updatedData);
    }

    setData({ step: 2, data: updatedExperiences });
  };

  const removeFromResume = (index) => {
    remove(index);
    experiences.splice(index, 1);

    setData({ step: 2, data: experiences });
  };

  return (
    <>
      <Controller
        name={`jobs.${index}.title`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Fonction dans l'entreprise"
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
        name={`jobs.${index}.company`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Entreprise"
            className="my-8"
            onBlur={(e) => {
              onBlur(e);
              updateResume(e.target.value, index, field);
            }}
            {...field}
          />
        )}
      />

      <Controller
        name={`jobs.${index}.companyDesc`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Description de l'entreprise"
            className="my-8"
            onBlur={(e) => {
              onBlur(e);
              updateResume(e.target.value, index, field);
            }}
            {...field}
          />
        )}
      />

      <Controller
        name={`jobs.${index}.current`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseCheckbox
            classNames={{
              label: "text-sm leading-6 text-gray-700",
            }}
            defaultSelected={!!watch(`jobs.${index}.current`)}
            onBlur={(e) => {
              onBlur(e);
              updateResume(e.target.value, index, field);
            }}
            {...field}
          >
            J&apos;occupe actuellement ce poste
          </BaseCheckbox>
        )}
      />

      <span className="block text-sm font-medium leading-6 text-gray-900 mt-8">
        Date de début
      </span>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-1">
          <Controller
            name={`jobs.${index}.fromMonth`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Mois"
                defaultSelectedKeys={
                  !!watch(`jobs.${index}.fromMonth`)
                    ? [watch(`jobs.${index}.fromMonth`)]
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
            name={`jobs.${index}.fromYear`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Année"
                defaultSelectedKeys={
                  !!watch(`jobs.${index}.fromYear`)
                    ? [watch(`jobs.${index}.fromYear`)]
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
            name={`jobs.${index}.toMonth`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Mois"
                isDisabled={!!watch(`jobs.${index}.current`)}
                defaultSelectedKeys={
                  watch(`jobs.${index}.current`) ||
                  !watch(`jobs.${index}.toMonth`)
                    ? []
                    : [watch(`jobs.${index}.toMonth`)]
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
            name={`jobs.${index}.toYear`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Année"
                isDisabled={!!watch(`jobs.${index}.current`)}
                defaultSelectedKeys={
                  watch(`jobs.${index}.current`) ||
                  !watch(`jobs.${index}.toYear`)
                    ? []
                    : [watch(`jobs.${index}.toYear`)]
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

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-8">
        <div className="sm:col-span-3">
          <Controller
            name={`jobs.${index}.city`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                label="Ville"
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
            name={`jobs.${index}.country`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                label="Pays"
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

      <div className="my-8 relative">
        <Controller
          name={`jobs.${index}.description`}
          control={control}
          render={({ field: { onBlur, ref, ...field } }) => (
            <BaseEditor
              label="Description"
              initialContent={
                experiences?.length > 0
                  ? experiences[index]?.description
                  : fieldData.description
              }
              onFocus={() => {
                displayHelp("jobExpDesc");
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

      <div className="flex justify-end mt-8">
        <Button
          color="danger"
          variant="light"
          onPress={() => removeFromResume(index)}
          startContent={<TrashIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Supprimer l'expérience professionnelle
        </Button>
      </div>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
