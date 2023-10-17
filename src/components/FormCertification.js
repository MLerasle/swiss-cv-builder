import { Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

import { months, years } from "@/lib/dates";

export default function FormCertification({ control, errors, index, remove }) {
  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 my-8">
      <div className="px-4 py-6 sm:p-8">
        <Controller
          name={`certifications${index}.title`}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => <Input label="Title" isRequired {...field} />}
        />
        {errors.title && <span>Title is missing.</span>}

        <Controller
          name={`certifications${index}.issuer`}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Input label="Issuer" isRequired className="my-8" {...field} />
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
                <Select label="Mois" {...field}>
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
                <Select label="Année" {...field}>
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
          <Button color="danger" variant="light" onPress={() => remove(index)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
