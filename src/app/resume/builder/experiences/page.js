"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormExperience from "@/components/FormExperience";
import FormActions from "@/components/FormActions";
import useFormStore from "@/store/useFormStore";
import { experienceData } from "@/store/data";

export default function WorkExperiences() {
  const router = useRouter();
  const { experiences, setData } = useFormStore();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { jobs: experiences } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "jobs",
  });

  const onSubmit = (data) => {
    setData({ step: 2, data: data.jobs });
    router.push("/resume/builder/skills");
  };

  const onAddJobExperience = () => {
    append(experienceData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {fields.map((field, index) => (
        <FormExperience
          control={control}
          watch={watch}
          errors={errors}
          key={field.id}
          index={index}
          remove={remove}
        />
      ))}

      <Button
        color="primary"
        variant="light"
        onPress={onAddJobExperience}
        startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
      >
        Ajouter une expérience professionnelle
      </Button>

      <FormActions prevLink="/resume/builder/personal-infos" />
    </form>
  );
}
