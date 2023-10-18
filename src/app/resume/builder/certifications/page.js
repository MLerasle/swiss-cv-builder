"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";

import FormCertification from "@/components/FormCertification";
import FormActions from "@/components/FormActions";
import useFormStore from "@/store/useFormStore";
import { certificationData } from "@/store/data";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Certifications() {
  const router = useRouter();
  const { certifications, setData } = useFormStore();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { certifications } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  const onSubmit = (data) => {
    setData({ step: 6, data: data.certifications });
    router.push("/resume/builder/references");
  };

  const onAddCertification = () => {
    append(certificationData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold leading-7 text-gray-900 mt-8">
        6. Certifications
      </h2>

      {fields.map((field, index) => (
        <FormCertification
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
        onPress={onAddCertification}
        startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
      >
        Ajouter une autre certification
      </Button>

      <FormActions prevLink="/resume/builder/education" />
    </form>
  );
}
