"use client";

import { useState } from "react";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormReference from "@/components/builder/FormReference";
import useFormStore, { referenceData } from "@/store/useFormStore";
import { scrollToElement } from "@/lib/scroll";

export function FormReferences() {
  const { references, setData } = useFormStore();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  const { control } = useForm({
    defaultValues: { references },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "references",
  });

  const onAddReference = () => {
    append(referenceData);
    scrollToElement("body");
    setTimeout(() => {
      setSelectedKeys(new Set([fields.length.toString()]));
    }, 1);
  };

  return (
    <form className="my-8">
      <Accordion
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        selectionBehavior="replace"
        itemClasses={{
          title: "font-medium",
          trigger: "data-[focus-visible=true]:outline-transparent ",
        }}
        className="px-0 gap-8"
      >
        {fields.map((field, index) => (
          <AccordionItem
            key={index}
            title={field.name || "Nouvelle référence"}
            className="reference"
          >
            <FormReference
              control={control}
              index={index}
              remove={remove}
              fieldData={field}
              references={references}
              setData={setData}
            />
          </AccordionItem>
        ))}
      </Accordion>

      <div className="my-8 py-3 border-y-1 border-slate-400 border-dashed">
        <Button
          color="primary"
          variant="light"
          onPress={onAddReference}
          startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Ajouter une référence
        </Button>
      </div>
    </form>
  );
}
