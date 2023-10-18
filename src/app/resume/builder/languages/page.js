"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

import { Card } from "@/components/Card";
import FormActions from "@/components/FormActions";
import useFormStore from "@/store/useFormStore";
import { languageLevels } from "@/lib/select-options";

export default function Languages() {
  const router = useRouter();
  const { languages, setData } = useFormStore();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { languages } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  const onSubmit = (data) => {
    setData({ step: 4, data: data.languages });
    router.push("/resume/builder/education");
  };

  const onAddLanguage = (event) => {
    if (event.key === "Enter" || event.type === "press") {
      append({ language: "", level: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <span className="block text-sm font-medium leading-6 text-gray-900">
          Ajoutez une à une les langues que vous parlez et votre niveau de
          compétence pour chacune d'entre elles :
        </span>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 mt-8"
          >
            <div className="sm:col-span-5">
              <Controller
                name={`languages.${index}.language`}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input label="Langue" isRequired {...field} />
                )}
              />
              {errors.language && <span>Language is missing.</span>}
            </div>

            <div className="sm:col-span-5">
              <Controller
                name={`languages.${index}.level`}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    label="Niveau de compétence"
                    defaultSelectedKeys={[watch(`languages.${index}.level`)]}
                    {...field}
                  >
                    {languageLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              {errors.level && <span>Level is missing.</span>}
            </div>

            <div className="sm:col-span-2 flex justify-center items-center">
              {fields.length > 1 && fields.length !== index + 1 ? (
                <Button
                  color="danger"
                  variant="light"
                  type="button"
                  className="ml-2"
                  onPress={() => remove(index)}
                  startContent={
                    <TrashIcon className="h-4 w-4" aria-hidden="true" />
                  }
                >
                  Supprimer
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="light"
                  type="button"
                  className="ml-2"
                  onPress={onAddLanguage}
                  startContent={
                    <PlusIcon className="h-4 w-4" aria-hidden="true" />
                  }
                >
                  Ajouter
                </Button>
              )}
            </div>
          </div>
        ))}
      </Card>

      <FormActions prevLink="/resume/builder/skills" />
    </form>
  );
}
