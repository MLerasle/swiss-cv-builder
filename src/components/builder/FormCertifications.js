"use client";

import { useState } from "react";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormCertification from "@/components/builder/FormCertification";
import useFormStore, { certificationData } from "@/store/useFormStore";
import { scrollToElement } from "@/lib/scroll";

export function FormCertifications() {
  const { certifications, setData } = useFormStore();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  const { control, watch } = useForm({
    defaultValues: { certifications },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  const onAddCertification = () => {
    append(certificationData);
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
          trigger: "data-[focus-visible=true]:outline-transparent",
        }}
        className="px-0 gap-8"
      >
        {fields.map((field, index) => (
          <AccordionItem
            key={index}
            title={field.title || "Nouvelle certification"}
          >
            <FormCertification
              control={control}
              watch={watch}
              index={index}
              remove={remove}
              fieldData={field}
              certifications={certifications}
              setData={setData}
            />
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 py-3 border-y-1 border-slate-400 border-dashed">
        <Button
          color="primary"
          variant="light"
          onPress={onAddCertification}
          startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Ajouter une autre certification
        </Button>
      </div>
    </form>
  );
}
