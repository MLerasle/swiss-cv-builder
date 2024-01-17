import { Controller } from "react-hook-form";
import { Button, SelectItem } from "@nextui-org/react";
import { TrashIcon, LinkIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/BaseInput";
import { BaseSelect } from "@/components/BaseSelect";
import { BaseTextarea } from "@/components/BaseTextarea";
import { BaseCheckbox } from "@/components/BaseCheckbox";
import HelpCard from "@/components/HelpCard";
import { months, years } from "@/lib/select-options";
import { useHelp } from "@/hooks/useHelp";

export default function FormExperience({
  control,
  watch,
  errors,
  index,
  remove,
}) {
  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  return (
    <>
      <Controller
        name={`projects.${index}.title`}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <BaseInput
            label="Nom du projet"
            autoFocus
            isRequired
            isInvalid={!!errors.projects && !!errors.projects[index]?.title}
            errorMessage={
              !!errors.projects &&
              !!errors.projects[index]?.title &&
              "Veuillez renseigner le nom du projet."
            }
            {...field}
          />
        )}
      />

      <Controller
        name={`projects.${index}.description`}
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseTextarea
            label="Descriptif"
            className="mt-8"
            onFocus={() => {
              if (index === 0) displayHelp("projectDesc");
            }}
            onBlur={(e) => {
              onBlur(e);
              hideHelp();
            }}
            {...field}
          />
        )}
      />

      <Controller
        name={`projects.${index}.link`}
        control={control}
        render={({ field }) => (
          <BaseInput
            label="Lien vers le projet"
            className="mt-8"
            startContent={<LinkIcon className="w-4 h-4" />}
            {...field}
          />
        )}
      />

      <Controller
        name={`projects.${index}.current`}
        control={control}
        render={({ field }) => (
          <BaseCheckbox
            className="mt-8"
            classNames={{
              label: "text-sm leading-6 text-gray-700",
            }}
            defaultSelected={watch(`projects.${index}.current`)}
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
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <BaseSelect
                label="Mois"
                defaultSelectedKeys={
                  !!watch(`projects.${index}.fromMonth`)
                    ? [watch(`projects.${index}.fromMonth`)]
                    : []
                }
                isRequired
                isInvalid={
                  !!errors.projects && !!errors.projects[index]?.fromMonth
                }
                errorMessage={
                  !!errors.projects &&
                  !!errors.projects[index]?.fromMonth &&
                  "Veuillez renseigner la date du début de votre projet."
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
            name={`projects.${index}.fromYear`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <BaseSelect
                label="Année"
                defaultSelectedKeys={
                  !!watch(`projects.${index}.fromYear`)
                    ? [watch(`projects.${index}.fromYear`)]
                    : []
                }
                isRequired
                isInvalid={
                  !!errors.projects && !!errors.projects[index]?.fromYear
                }
                errorMessage={
                  !!errors.projects &&
                  !!errors.projects[index]?.fromYear &&
                  "Veuillez renseigner la date du début de votre projet."
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
            name={`projects.${index}.toMonth`}
            control={control}
            rules={{
              required: !watch(`projects.${index}.current`),
            }}
            render={({ field }) => (
              <BaseSelect
                label="Mois"
                isDisabled={watch(`projects.${index}.current`)}
                defaultSelectedKeys={
                  watch(`projects.${index}.current`) ||
                  !watch(`projects.${index}.toMonth`)
                    ? []
                    : [watch(`projects.${index}.toMonth`)]
                }
                isRequired={!watch(`projects.${index}.current`)}
                isInvalid={
                  watch(`projects.${index}.current`)
                    ? false
                    : !!errors.projects && !!errors.projects[index]?.toMonth
                }
                errorMessage={
                  !watch(`projects.${index}.current`) &&
                  !!errors.projects &&
                  !!errors.projects[index]?.toMonth &&
                  "Veuillez renseigner la date de fin de votre projet si vous ne travaillez plus dessus."
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
            name={`projects.${index}.toYear`}
            control={control}
            rules={{
              required: !watch(`projects.${index}.current`),
            }}
            render={({ field }) => (
              <BaseSelect
                label="Année"
                isDisabled={watch(`projects.${index}.current`)}
                defaultSelectedKeys={
                  watch(`projects.${index}.current`) ||
                  !watch(`projects.${index}.toYear`)
                    ? []
                    : [watch(`projects.${index}.toYear`)]
                }
                isRequired={!watch(`projects.${index}.current`)}
                isInvalid={
                  watch(`projects.${index}.current`)
                    ? false
                    : !!errors.projects && !!errors.projects[index]?.toYear
                }
                errorMessage={
                  !watch(`projects.${index}.current`) &&
                  !!errors.projects &&
                  !!errors.projects[index]?.toYear &&
                  "Veuillez renseigner la date de fin de votre projet si vous ne travaillez plus dessus."
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

      <div className="flex justify-end mt-8">
        <Button
          color="danger"
          variant="light"
          onPress={() => remove(index)}
          startContent={<TrashIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Supprimer le projet
        </Button>
      </div>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
