import { Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem, Checkbox } from "@nextui-org/react";

import { Card } from "@/components/Card";
import FormExperienceDesc from "@/components/FormExperienceDesc";
import { months, years } from "@/lib/select-options";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function FormExperience({
  control,
  watch,
  errors,
  index,
  remove,
}) {
  return (
    <Card>
      <Controller
        name={`jobs.${index}.company`}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Input label="Entreprise" autoFocus isRequired {...field} />
        )}
      />
      {errors.company && <span>Company is missing.</span>}

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
            className="my-8"
            {...field}
          />
        )}
      />
      {errors.title && <span>Job Title is missing.</span>}

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Controller
            name={`jobs.${index}.city`}
            control={control}
            render={({ field }) => <Input label="Ville" {...field} />}
          />
          {errors.city && <span>City is missing.</span>}
        </div>

        <div className="sm:col-span-3">
          <Controller
            name={`jobs.${index}.country`}
            control={control}
            render={({ field }) => <Input label="Pays" {...field} />}
          />
          {errors.country && <span>Country is missing.</span>}
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
                defaultSelectedKeys={[watch(`jobs.${index}.fromMonth`)]}
                {...field}
              >
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          {errors.fromMonth && <span>From Month is missing.</span>}
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
                defaultSelectedKeys={[watch(`jobs.${index}.fromYear`)]}
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
          {errors.fromYear && <span>From Year is missing.</span>}
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
                  watch(`jobs.${index}.current`)
                    ? []
                    : [watch(`jobs.${index}.toMonth`)]
                }
                {...field}
              >
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          {errors.toMonth && <span>To Month is missing.</span>}
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
                  watch(`jobs.${index}.current`)
                    ? []
                    : [watch(`jobs.${index}.toYear`)]
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
          {errors.toYear && <span>To Year is missing.</span>}
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
    </Card>
  );
}
