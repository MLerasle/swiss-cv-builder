import { Controller } from "react-hook-form";
import { Button, SelectItem } from "@nextui-org/react";
import { TrashIcon, LinkIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/UI/BaseInput";
import { BaseSelect } from "@/components/UI/BaseSelect";
import { BaseTextarea } from "@/components/UI/BaseTextarea";
import { BaseCheckbox } from "@/components/UI/BaseCheckbox";
import HelpCard from "@/components/builder/HelpCard";
import { months, years } from "@/lib/select-options";
import { useHelp } from "@/hooks/useHelp";

export default function FormExperience({
  control,
  watch,
  errors,
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
        rules={{
          required: true,
        }}
        render={({ field: { onBlur, ...field } }) => (
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
            onBlur={(e) => {
              onBlur(e);
              updateResume(e.target.value, index, field);
            }}
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
              updateResume(e.target.value, index, field);
            }}
            {...field}
          />
        )}
      />

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
            rules={{
              required: true,
            }}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
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
            rules={{
              required: true,
            }}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
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
            rules={{
              required: !watch(`projects.${index}.current`),
            }}
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
            rules={{
              required: !watch(`projects.${index}.current`),
            }}
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
