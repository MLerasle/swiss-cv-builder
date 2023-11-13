import { Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem, Checkbox } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import HelpCard from "@/components/HelpCard";
import FormExperienceDesc from "@/components/FormExperienceDesc";
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
      <div className="p-2">
        <Controller
          name={`jobs.${index}.company`}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onBlur, ...field } }) => (
            <Input
              label="Entreprise"
              autoFocus
              isRequired
              isInvalid={!!errors.jobs && !!errors?.jobs[index]?.company}
              errorMessage={
                !!errors.jobs &&
                !!errors?.jobs[index]?.company &&
                "Veuillez renseigner le nom de l'entreprise."
              }
              onFocus={() => {
                if (index === 0) displayHelp("jobExpOrder");
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
          name={`jobs.${index}.companyDesc`}
          control={control}
          render={({ field }) => (
            <Input
              label="Description de l'entreprise"
              className="my-8"
              {...field}
            />
          )}
        />

        <Controller
          name={`jobs.${index}.title`}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Input
              label="Fonction dans l'entreprise"
              isRequired
              isInvalid={!!errors.jobs && !!errors.jobs[index]?.title}
              errorMessage={
                !!errors.jobs &&
                !!errors.jobs[index]?.title &&
                "Veuillez renseigner la fonction que vous occupiez dans cette entreprise."
              }
              className="my-8"
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Controller
              name={`jobs.${index}.city`}
              control={control}
              render={({ field }) => <Input label="Ville" {...field} />}
            />
          </div>

          <div className="sm:col-span-3">
            <Controller
              name={`jobs.${index}.country`}
              control={control}
              render={({ field }) => <Input label="Pays" {...field} />}
            />
          </div>
        </div>

        <Controller
          name={`jobs.${index}.current`}
          control={control}
          render={({ field }) => (
            <Checkbox
              className="mt-8"
              classNames={{
                label: "text-sm font-medium leading-6 text-gray-900",
              }}
              defaultSelected={watch(`jobs.${index}.current`)}
              {...field}
            >
              J&apos;occupe actuellement ce poste
            </Checkbox>
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
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  label="Mois"
                  defaultSelectedKeys={
                    !!watch(`jobs.${index}.fromMonth`)
                      ? [watch(`jobs.${index}.fromMonth`)]
                      : []
                  }
                  isRequired
                  isInvalid={!!errors.jobs && !!errors.jobs[index]?.fromMonth}
                  errorMessage={
                    !!errors.jobs &&
                    !!errors.jobs[index]?.fromMonth &&
                    "Veuillez renseigner la date du début de votre collaboration."
                  }
                  {...field}
                >
                  {months.map((month) => (
                    <SelectItem key={month.num} value={month.num}>
                      {month.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <div className="sm:col-span-3 mt-8 sm:mt-1">
            <Controller
              name={`jobs.${index}.fromYear`}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  label="Année"
                  defaultSelectedKeys={
                    !!watch(`jobs.${index}.fromYear`)
                      ? [watch(`jobs.${index}.fromYear`)]
                      : []
                  }
                  isRequired
                  isInvalid={!!errors.jobs && !!errors.jobs[index]?.fromYear}
                  errorMessage={
                    !!errors.jobs &&
                    !!errors.jobs[index]?.fromYear &&
                    "Veuillez renseigner la date du début de votre collaboration."
                  }
                  {...field}
                >
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </Select>
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
              rules={{
                required: !watch(`jobs.${index}.current`),
              }}
              render={({ field }) => (
                <Select
                  label="Mois"
                  isDisabled={watch(`jobs.${index}.current`)}
                  defaultSelectedKeys={
                    watch(`jobs.${index}.current`) ||
                    !watch(`jobs.${index}.toMonth`)
                      ? []
                      : [watch(`jobs.${index}.toMonth`)]
                  }
                  isRequired={!watch(`jobs.${index}.current`)}
                  isInvalid={
                    watch(`jobs.${index}.current`)
                      ? false
                      : !!errors.jobs && !!errors.jobs[index]?.toMonth
                  }
                  errorMessage={
                    !watch(`jobs.${index}.current`) &&
                    !!errors.jobs &&
                    !!errors.jobs[index]?.toMonth &&
                    "Veuillez renseigner la date de fin de votre collaboration si vous n'occupez plus ce poste."
                  }
                  {...field}
                >
                  {months.map((month) => (
                    <SelectItem key={month.num} value={month.num}>
                      {month.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <div className="sm:col-span-3 mt-8 sm:mt-1">
            <Controller
              name={`jobs.${index}.toYear`}
              control={control}
              rules={{
                required: !watch(`jobs.${index}.current`),
              }}
              render={({ field }) => (
                <Select
                  label="Année"
                  isDisabled={watch(`jobs.${index}.current`)}
                  defaultSelectedKeys={
                    watch(`jobs.${index}.current`) ||
                    !watch(`jobs.${index}.toYear`)
                      ? []
                      : [watch(`jobs.${index}.toYear`)]
                  }
                  isRequired={!watch(`jobs.${index}.current`)}
                  isInvalid={
                    watch(`jobs.${index}.current`)
                      ? false
                      : !!errors.jobs && !!errors.jobs[index]?.toYear
                  }
                  errorMessage={
                    !watch(`jobs.${index}.current`) &&
                    !!errors.jobs &&
                    !!errors.jobs[index]?.toYear &&
                    "Veuillez renseigner la date de fin de votre collaboration si vous n'occupez plus ce poste."
                  }
                  {...field}
                >
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
        </div>

        <FormExperienceDesc descIndex={index} control={control} />

        <div className="flex justify-end mt-8">
          <Button
            color="danger"
            variant="light"
            onPress={() => remove(index)}
            startContent={<TrashIcon className="h-4 w-4" aria-hidden="true" />}
          >
            Supprimer l'expérience professionnelle
          </Button>
        </div>
      </div>

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </>
  );
}
