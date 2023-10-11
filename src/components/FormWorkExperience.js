import { Controller } from "react-hook-form";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Textarea,
} from "@nextui-org/react";

import { months, years } from "@/lib/dates";

export default function FormWorkExperience({
  control,
  watch,
  errors,
  index,
  remove,
}) {
  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 my-8">
      <div className="px-4 py-6 sm:p-8">
        <Controller
          name={`jobs.${index}.company`}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Input label="Company" isRequired {...field} />
          )}
        />
        {errors.company && <span>Company is missing.</span>}

        <Controller
          name={`jobs.${index}.title`}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Input label="Job Title" isRequired className="my-8" {...field} />
          )}
        />
        {errors.title && <span>Job Title is missing.</span>}

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Controller
              name={`jobs.${index}.city`}
              control={control}
              render={({ field }) => <Input label="City" {...field} />}
            />
            {errors.city && <span>City is missing.</span>}
          </div>

          <div className="sm:col-span-3">
            <Controller
              name={`jobs.${index}.country`}
              control={control}
              render={({ field }) => <Input label="Country" {...field} />}
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
                <Select label="Mois" {...field}>
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
                <Select label="Année" {...field}>
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

        <Controller
          name={`jobs.${index}.description`}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Textarea
              label="Descriptif"
              isRequired
              className="mt-8"
              {...field}
            />
          )}
        />
        {errors.description && <span>Job Description is missing.</span>}

        <div className="flex justify-end mt-8">
          <Button color="danger" variant="light" onPress={() => remove(index)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
