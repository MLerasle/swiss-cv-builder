import { Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { Card } from "@/components/Card";
import { months, years } from "@/lib/select-options";

export default function FormEducation({ control, errors, index, remove }) {
  return (
    <Card>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Controller
            name={`education.${index}.school`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input label="École" autoFocus isRequired {...field} />
            )}
          />
          {errors.school && <span>School is missing.</span>}
        </div>

        <div className="sm:col-span-3">
          <Controller
            name={`education.${index}.degree`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input label="Diplôme" isRequired {...field} />
            )}
          />
          {errors.degree && <span>Degree is missing.</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 my-8">
        <div className="sm:col-span-3">
          <Controller
            name={`education.${index}.field`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input label="Domaine d'études" isRequired {...field} />
            )}
          />
          {errors.field && <span>Field is missing.</span>}
        </div>

        <div className="sm:col-span-3">
          <Controller
            name={`education.${index}.grade`}
            control={control}
            render={({ field }) => <Input label="Résultat obtenu" {...field} />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Controller
            name={`education.${index}.city`}
            control={control}
            render={({ field }) => <Input label="Ville" {...field} />}
          />
          {errors.city && <span>City is missing.</span>}
        </div>

        <div className="sm:col-span-3">
          <Controller
            name={`education.${index}.country`}
            control={control}
            render={({ field }) => <Input label="Pays" {...field} />}
          />
          {errors.country && <span>Country is missing.</span>}
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
            name={`education.${index}.fromYear`}
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
            name={`education.${index}.toMonth`}
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
          {errors.toMonth && <span>To Month is missing.</span>}
        </div>

        <div className="sm:col-span-3 mt-8 sm:mt-1">
          <Controller
            name={`education.${index}.toYear`}
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
          {errors.toYear && <span>To Year is missing.</span>}
        </div>
      </div>

      <Controller
        name={`education.${index}.description`}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Textarea label="Descriptif" isRequired className="mt-8" {...field} />
        )}
      />
      {errors.description && <span>Job Description is missing.</span>}

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
    </Card>
  );
}
