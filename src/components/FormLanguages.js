"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, SelectItem } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/BaseInput";
import { BaseSelect } from "@/components/BaseSelect";
import HelpCard from "@/components/HelpCard";
import FormActions from "@/components/FormActions";
import useFormStore, { languageData } from "@/store/useFormStore";
import { languageLevels } from "@/lib/select-options";
import { useHelp } from "@/hooks/useHelp";

export function FormLanguages() {
  const router = useRouter();
  const { languages, setData } = useFormStore();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      languages: languages.length > 0 ? languages : [languageData],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  const onSubmit = (data) => {
    setData({ step: 4, data: data.languages });
    router.push("/resume/builder/education");
  };

  const onAddLanguage = () => {
    append({ language: "", level: "" });
  };

  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();

  const updateResume = (value, index, field) => {
    const fieldName = field.name.split(".").slice(-1)[0];
    const updatedFieldData = languages[index] || languageData;
    const updatedData = { ...updatedFieldData, [fieldName]: value };
    let updatedLanguages = [...languages];

    if (languages[index]) {
      updatedLanguages = languages.map((s, idx) => {
        if (idx === index) {
          return updatedData;
        } else {
          return s;
        }
      });
    } else {
      updatedLanguages.push(updatedData);
    }

    setData({ step: 4, data: updatedLanguages });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <span className="block text-sm font-medium leading-6 text-gray-900 mt-8">
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
              render={({ field: { onBlur, ...field } }) => (
                <BaseInput
                  label="Langue"
                  isRequired
                  isInvalid={
                    !!errors.languages && !!errors.languages[index]?.language
                  }
                  errorMessage={
                    !!errors.languages &&
                    !!errors.languages[index]?.language &&
                    "Veuillez renseigner la langue."
                  }
                  onFocus={() => {
                    if (index === 0) displayHelp("language");
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
          </div>

          <div className="sm:col-span-5">
            <Controller
              name={`languages.${index}.level`}
              control={control}
              render={({ field: { onBlur, ...field } }) => (
                <BaseSelect
                  variant="bordered"
                  label="Niveau de compétence"
                  defaultSelectedKeys={
                    watch(`languages.${index}.level`)
                      ? [watch(`languages.${index}.level`)]
                      : []
                  }
                  onBlur={(e) => {
                    onBlur(e);
                    updateResume(e.target.value, index, field);
                  }}
                  {...field}
                >
                  {languageLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </BaseSelect>
              )}
            />
          </div>

          <div className="sm:col-span-2 flex justify-center items-center">
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
          </div>
        </div>
      ))}

      <Button
        color="primary"
        variant="bordered"
        type="button"
        className="mt-8"
        onPress={onAddLanguage}
        startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
      >
        Ajouter une langue
      </Button>

      <FormActions prevLink="/resume/builder/skills" />

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </form>
  );
}
