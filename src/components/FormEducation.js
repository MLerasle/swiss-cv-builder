import { Controller } from "react-hook-form";
import { Button, SelectItem } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/BaseInput";
import { BaseSelect } from "@/components/BaseSelect";
import { BaseTextarea } from "@/components/BaseTextarea";
import HelpCard from "./HelpCard";
import { months, years } from "@/lib/select-options";
import { useHelp } from "@/hooks/useHelp";

export default function FormEducation({
  control,
  watch,
  errors,
  index,
  remove,
}) {
  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

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
          render={({ field }) => (
            <BaseInput
              label="Domaine d'études"
              isRequired
              isInvalid={!!errors.education && !!errors.education[index]?.field}
              errorMessage={
                !!errors.education &&
                !!errors.education[index]?.field &&
                "Veuillez renseigner le domaine d'études de votre diplôme."
              }
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
            render={({ field }) => <BaseInput label="Ville" {...field} />}
          />
        </div>

        <div className="sm:col-span-3">
          <Controller
            name={`education.${index}.country`}
            control={control}
            render={({ field }) => <BaseInput label="Pays" {...field} />}
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
            render={({ field }) => (
              <BaseSelect
                label="Mois"
                defaultSelectedKeys={
                  !!watch(`education.${index}.fromMonth`)
                    ? [watch(`education.${index}.fromMonth`)]
                    : []
                }
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
            render={({ field }) => (
              <BaseSelect
                label="Année"
                defaultSelectedKeys={
                  !!watch(`education.${index}.fromYear`)
                    ? [watch(`education.${index}.fromYear`)]
                    : []
                }
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
            render={({ field }) => (
              <BaseSelect
                label="Mois"
                defaultSelectedKeys={
                  !!watch(`education.${index}.toMonth`)
                    ? [watch(`education.${index}.toMonth`)]
                    : []
                }
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
            render={({ field }) => (
              <BaseSelect
                label="Année"
                defaultSelectedKeys={
                  !!watch(`education.${index}.toYear`)
                    ? [watch(`education.${index}.toYear`)]
                    : []
                }
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
        render={({ field: { onBlur, ...field } }) => (
          <BaseTextarea
            label="Descriptif"
            className="mt-8"
            onFocus={() => {
              if (index === 0) displayHelp("degreeDesc");
            }}
            onBlur={(e) => {
              onBlur(e);
              hideHelp();
            }}
            {...field}
          />
        )}
      />

      <div className="flex justify-end mt-8">
        <Button
          color="danger"
          variant="light"
          onPress={() => remove(index)}
          startContent={<TrashIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Supprimer la formation
        </Button>
      </div>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
