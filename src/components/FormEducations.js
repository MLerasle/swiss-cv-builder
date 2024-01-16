"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormEducation from "@/components/FormEducation";
import FormActions from "@/components/FormActions";
import useFormStore, { trainingData } from "@/store/useFormStore";
import { scrollToElement } from "@/lib/scroll";

export function FormEducations() {
  const router = useRouter();
  const { education, setData } = useFormStore();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education: education.length > 0 ? education : [trainingData],
    },
  });

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
    scrollToElement("body");
    setTimeout(() => {
      setSelectedKeys(new Set([fields.length.toString()]));
    }, 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Accordion
        variant="splitted"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        selectionBehavior="replace"
        itemClasses={{
          title: "px-2 font-medium",
        }}
        className="my-8 px-0 gap-8"
      >
        {fields.map((field, index) => (
          <AccordionItem
            key={index}
            title={field.degree || "Nouvelle formation"}
          >
            <FormEducation
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
        onPress={onAddEducation}
        startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
      >
        Ajouter une formation
      </Button>

      <FormActions prevLink="/resume/builder/languages" />
    </form>
  );
}
