"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormProject from "@/components/FormProject";
import FormActions from "@/components/FormActions";
import useFormStore from "@/store/useFormStore";
import { projectData } from "@/store/data";

export default function Projects() {
  const router = useRouter();
  const { projects, setData } = useFormStore();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { projects } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const onSubmit = (data) => {
    setData({ step: 8, data: data.projects });
    router.push("/resume/builder/summary");
  };

  const onAddProject = () => {
    append(projectData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {fields.map((field, index) => (
        <FormProject
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
        onPress={onAddProject}
        startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
      >
        Ajouter un projet personnel
      </Button>

      <FormActions prevLink="/resume/builder/references" />
    </form>
  );
}
