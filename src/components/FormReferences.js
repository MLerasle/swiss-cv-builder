"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormReference from "@/components/FormReference";
import FormActions from "@/components/FormActions";
import useFormStore, { referenceData } from "@/store/useFormStore";
import { scrollToElement } from "@/lib/scroll";

export function FormReferences() {
  const router = useRouter();
  const { references, setData } = useFormStore();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      references: references.length > 0 ? references : [referenceData],
    },
  });

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
    scrollToElement("body");
    setTimeout(() => {
      setSelectedKeys(new Set([fields.length.toString()]));
    }, 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Accordion
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        selectionBehavior="replace"
        itemClasses={{
          title: "font-medium",
          trigger: "data-[focus-visible=true]:outline-transparent ",
        }}
        className="my-8 px-0 gap-8"
      >
        {fields.map((field, index) => (
          <AccordionItem
            key={index}
            title={field.name || "Nouvelle référence"}
            className="reference"
          >
            <FormReference
              control={control}
              errors={errors}
              index={index}
              remove={remove}
              fieldData={field}
              references={references}
              setData={setData}
            />
          </AccordionItem>
        ))}
      </Accordion>

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
