"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormProject from "@/components/FormProject";
import FormActions from "@/components/FormActions";
import useFormStore, { projectData } from "@/store/useFormStore";

export default function Projects() {
  const router = useRouter();
  const { setData } = useFormStore();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { projects: [projectData] } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const onSubmit = (data) => {
    setData({ step: 8, data: data.projects });
    router.push("/resume/builder/hobbies");
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
        variant="bordered"
        onPress={onAddProject}
        startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
      >
        Ajouter un projet personnel
      </Button>

      <FormActions prevLink="/resume/builder/references" />
    </form>
  );
}
