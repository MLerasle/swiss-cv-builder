"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormEducation from "@/components/builder/FormEducation";
import FormActions from "@/components/builder/FormActions";
import useFormStore, { trainingData } from "@/store/useFormStore";
import { scrollToElement } from "@/lib/scroll";

export function FormEducations() {
  const router = useRouter();
  const { education, setData } = useFormStore();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  const { control, watch, handleSubmit } = useForm({
    defaultValues: { education },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = () => {
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
      <h2 className="font-medium leading-6 text-slate-800 mt-8">
        Commencez par le dernier diplôme que vous avez obtenu.
      </h2>
      <Accordion
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        selectionBehavior="replace"
        itemClasses={{
          title: "font-medium",
          trigger: "data-[focus-visible=true]:outline-transparent",
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
              index={index}
              remove={remove}
              fieldData={field}
              education={education}
              setData={setData}
            />
          </AccordionItem>
        ))}
      </Accordion>

      <div className="py-3 border-y-1 border-slate-400 border-dashed">
        <Button
          color="primary"
          variant="light"
          onPress={onAddEducation}
          startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Ajouter une formation
        </Button>
      </div>

      <FormActions prevLink="/resume/builder/languages" />
    </form>
  );
}
