import { Controller } from "react-hook-form";
import { Button, SelectItem } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/UI/BaseInput";
import { BaseSelect } from "@/components/UI/BaseSelect";
import { BaseEditor } from "@/components/UI/BaseEditor";
import HelpCard from "./HelpCard";
import { months, years } from "@/lib/select-options";
import { useHelp } from "@/hooks/useHelp";

export default function FormEducation({
  control,
  watch,
  errors,
  index,
  remove,
  fieldData,
  education,
  setData,
}) {
  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  const updateResume = (value, index, field) => {
    const fieldName = field.name.split(".").slice(-1)[0];
    const updatedFieldData = education[index] || fieldData;
    const updatedData = { ...updatedFieldData, [fieldName]: value };
    let updatedEducation = [...education];

    if (education[index]) {
      updatedEducation = education.map((ed, idx) => {
        if (idx === index) {
          return updatedData;
        } else {
          return ed;
        }
      });
    } else {
      updatedEducation.push(updatedData);
    }

    setData({ step: 5, data: updatedEducation });
  };

  const removeFromResume = (index) => {
    remove(index);
    education.splice(index, 1);

    setData({ step: 5, data: education });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Controller
            name={`education.${index}.school`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                label="École"
                autoFocus
                isRequired
                isInvalid={
                  !!errors.education && !!errors.education[index]?.school
                }
                errorMessage={
                  !!errors.education &&
                  !!errors.education[index]?.school &&
                  "Veuillez renseigner l'école dans laquelle vous avez obtenu votre diplôme."
                }
                onFocus={() => {
                  if (index === 0) displayHelp("educationOrder");
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
        </div>

        <div className="sm:col-span-3">
          <Controller
            name={`education.${index}.degree`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                label="Diplôme"
                isRequired
                isInvalid={
                  !!errors.education && !!errors.education[index]?.degree
                }
                errorMessage={
                  !!errors.education &&
                  !!errors.education[index]?.degree &&
                  "Veuillez renseigner le diplôme obtenu."
                }
                onFocus={() => {
                  if (index === 0) displayHelp("degree");
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
        </div>
      </div>

      <div className="my-8">
        <Controller
          name={`education.${index}.field`}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onBlur, ...field } }) => (
            <BaseInput
              label="Domaine d'études"
              isRequired
              isInvalid={!!errors.education && !!errors.education[index]?.field}
              errorMessage={
                !!errors.education &&
                !!errors.education[index]?.field &&
                "Veuillez renseigner le domaine d'études de votre diplôme."
              }
              onBlur={(e) => {
                onBlur(e);
                updateResume(e.target.value, index, field);
              }}
              {...field}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Controller
            name={`education.${index}.city`}
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
            name={`education.${index}.country`}
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

      <span className="block text-sm font-medium leading-6 text-gray-900 mt-8">
        Date de début
      </span>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-1">
          <Controller
            name={`education.${index}.fromMonth`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Mois"
                defaultSelectedKeys={
                  !!watch(`education.${index}.fromMonth`)
                    ? [watch(`education.${index}.fromMonth`)]
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
            name={`education.${index}.fromYear`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Année"
                defaultSelectedKeys={
                  !!watch(`education.${index}.fromYear`)
                    ? [watch(`education.${index}.fromYear`)]
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
            name={`education.${index}.toMonth`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Mois"
                defaultSelectedKeys={
                  !!watch(`education.${index}.toMonth`)
                    ? [watch(`education.${index}.toMonth`)]
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
            name={`education.${index}.toYear`}
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Année"
                defaultSelectedKeys={
                  !!watch(`education.${index}.toYear`)
                    ? [watch(`education.${index}.toYear`)]
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

      <Controller
        name={`education.${index}.description`}
        control={control}
        render={({ field: { onBlur, ref, ...field } }) => (
          <BaseEditor
            label="Description"
            initialContent={
              education?.length > 0
                ? education[index]?.description
                : fieldData.education
            }
            onFocus={() => {
              displayHelp("degreeDesc");
            }}
            onBlur={(e) => {
              onBlur(e);
              updateResume(e, index, field);
            }}
            {...field}
          />
        )}
      />

      <div className="flex justify-end mt-8">
        <Button
          color="danger"
          variant="light"
          onPress={() => removeFromResume(index)}
          startContent={<TrashIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Supprimer la formation
        </Button>
      </div>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
