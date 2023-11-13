"use client";

import { useRouter } from "next/navigation";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormCertification from "@/components/FormCertification";
import FormActions from "@/components/FormActions";
import useFormStore, { certificationData } from "@/store/useFormStore";

export default function Certifications() {
  const router = useRouter();
  const { certifications, setData } = useFormStore();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      certifications:
        certifications.length > 0 ? certifications : [certificationData],
    },
  });

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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Accordion
        variant="splitted"
        defaultSelectedKeys={[fields[fields.length - 1].id]}
        itemClasses={{
          title: "px-2 font-medium",
        }}
        className="my-8 px-0 gap-8"
      >
        {fields.map((field, index) => (
          <AccordionItem
            key={field.id}
            title={field.title || "Nouvelle certification"}
          >
            <FormCertification
              control={control}
              watch={watch}
              errors={errors}
              index={index}
              remove={remove}
            />
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        color="primary"
        variant="bordered"
        onPress={onAddCertification}
        startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
      >
        Ajouter une autre certification
      </Button>

      <FormActions prevLink="/resume/builder/education" />
    </form>
  );
}
