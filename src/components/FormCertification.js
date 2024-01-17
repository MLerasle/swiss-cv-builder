import { Controller } from "react-hook-form";
import { Button, SelectItem } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/BaseInput";
import { BaseSelect } from "@/components/BaseSelect";
import HelpCard from "./HelpCard";
import { months, years } from "@/lib/select-options";
import { useHelp } from "@/hooks/useHelp";

export default function FormCertification({
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
        name={`certifications.${index}.title`}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Nom"
            autoFocus
            isRequired
            isInvalid={
              !!errors.certifications && !!errors.certifications[index]?.title
            }
            errorMessage={
              !!errors.certifications &&
              !!errors.certifications[index]?.title &&
              "Veuillez renseigner le nom de votre certification."
            }
            onFocus={() => {
              if (index === 0) displayHelp("certification");
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
        name={`certifications.${index}.issuer`}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <BaseInput
            label="Organisme de délivrance"
            isRequired
            isInvalid={
              !!errors.certifications && !!errors.certifications[index]?.issuer
            }
            errorMessage={
              !!errors.certifications &&
              !!errors.certifications[index]?.issuer &&
              "Veuillez renseigner l'organisme de délivrance de votre certification."
            }
            className="my-8"
            {...field}
          />
        )}
      />

      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Controller
            name={`certifications.${index}.month`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <BaseSelect
                label="Mois"
                defaultSelectedKeys={
                  watch(`certifications.${index}.month`)
                    ? [watch(`certifications.${index}.month`)]
                    : []
                }
                isRequired
                isInvalid={
                  !!errors.certifications &&
                  !!errors.certifications[index]?.month
                }
                errorMessage={
                  !!errors.certifications &&
                  !!errors.certifications[index]?.month &&
                  "Veuillez renseigner la date d'obtention de votre certification."
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

        <div className="sm:col-span-3 mt-8 sm:mt-0">
          <Controller
            name={`certifications.${index}.year`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <BaseSelect
                label="Année"
                defaultSelectedKeys={
                  watch(`certifications.${index}.year`)
                    ? [watch(`certifications.${index}.year`)]
                    : []
                }
                isRequired
                isInvalid={
                  !!errors.certifications &&
                  !!errors.certifications[index]?.year
                }
                errorMessage={
                  !!errors.certifications &&
                  !!errors.certifications[index]?.year &&
                  "Veuillez renseigner la date d'obtention de votre certification."
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
          Supprimer la certification
        </Button>
      </div>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
