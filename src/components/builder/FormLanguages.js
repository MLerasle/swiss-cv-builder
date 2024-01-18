"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, SelectItem } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

import { BaseInput } from "@/components/UI/BaseInput";
import { BaseSelect } from "@/components/UI/BaseSelect";
import HelpCard from "@/components/builder/HelpCard";
import FormActions from "@/components/builder/FormActions";
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
  } = useForm({ defaultValues: { languages } });

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

  const removeFromResume = (index) => {
    remove(index);
    languages.splice(index, 1);

    setData({ step: 4, data: languages });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <span className="block text-sm font-medium leading-6 text-slate-500 mt-2">
        Ajoutez une à une les langues que vous parlez et votre niveau de
        compétence pour chacune d'entre elles
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
              onPress={() => removeFromResume(index)}
              startContent={
                <TrashIcon className="h-4 w-4" aria-hidden="true" />
              }
            >
              Supprimer
            </Button>
          </div>
        </div>
      ))}

      <div className="mt-8 py-3 border-y-1 border-slate-400 border-dashed">
        <Button
          color="primary"
          variant="light"
          type="button"
          onPress={onAddLanguage}
          startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Ajouter une langue
        </Button>
      </div>

      <FormActions prevLink="/resume/builder/skills" />

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </form>
  );
}
