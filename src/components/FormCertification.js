import { Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { Card } from "@/components/Card";
import { months, years } from "@/lib/select-options";

export default function FormCertification({
  control,
  watch,
  errors,
  index,
  remove,
}) {
  return (
    <Card>
      <Controller
        name={`certifications.${index}.title`}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Input label="Nom" autoFocus isRequired {...field} />
        )}
      />
      {errors.title && <span>Title is missing.</span>}

      <Controller
        name={`certifications.${index}.issuer`}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Input
            label="Organisme de délivrance"
            isRequired
            className="my-8"
            {...field}
          />
        )}
      />
      {errors.issuer && <span>Issuer is missing.</span>}

      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Controller
            name={`certifications.${index}.month`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                label="Mois"
                defaultSelectedKeys={[watch(`certifications.${index}.month`)]}
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
          {errors.month && <span>Month is missing.</span>}
        </div>

        <div className="sm:col-span-3 mt-8 sm:mt-0">
          <Controller
            name={`certifications.${index}.year`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                label="Année"
                defaultSelectedKeys={[watch(`certifications.${index}.year`)]}
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
          {errors.year && <span>Year is missing.</span>}
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
    </Card>
  );
}
