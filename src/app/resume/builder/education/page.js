"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";

import FormEducation from "@/components/FormEducation";
import FormActions from "@/components/FormActions";
import useFormStore from "@/store/useFormStore";
import { trainingData } from "@/store/data";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function WorkExperiences() {
  const router = useRouter();
  const { education, setData } = useFormStore();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { education } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = (data) => {
    setData({ step: 5, data: data.education });
    router.push("/resume/builder/certifications");
  };

  const onAddEducation = () => {
    append(trainingData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold leading-7 text-gray-900 mt-8">
        5. Formation
      </h2>

      {fields.map((field, index) => (
        <FormEducation
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
        onPress={onAddEducation}
        startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
      >
        Ajouter une formation
      </Button>

      <FormActions prevLink="/resume/builder/languages" />
    </form>
  );
}
