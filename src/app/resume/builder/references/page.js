"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormReference from "@/components/FormReference";
import FormActions from "@/components/FormActions";
import useFormStore from "@/store/useFormStore";
import { referenceData } from "@/store/data";

export default function WorkExperiences() {
  const router = useRouter();
  const { references, setData } = useFormStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { references } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "references",
  });

  const onSubmit = (data) => {
    setData({ step: 7, data: data.references });
    router.push("/resume/builder/projects");
  };

  const onAddReference = () => {
    append(referenceData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {fields.map((field, index) => (
        <FormReference
          control={control}
          errors={errors}
          key={field.id}
          index={index}
          remove={remove}
        />
      ))}

      <Button
        color="primary"
        variant="bordered"
        onPress={onAddReference}
        startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
      >
        Ajouter une autre référence
      </Button>

      <FormActions prevLink="/resume/builder/certifications" />
    </form>
  );
}
