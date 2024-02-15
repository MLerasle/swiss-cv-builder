"use client";

import { useState } from "react";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";
import { NewspaperIcon } from "@heroicons/react/24/outline";

import FormPublication from "@/components/builder/FormPublication";
import useFormStore, { publicationData } from "@/store/useFormStore";
import { scrollToElement } from "@/lib/scroll";

export function FormPublications() {
  const { publications, setData } = useFormStore();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  const { control, watch } = useForm({
    defaultValues: { publications },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "publications",
  });

  const onAddPublication = () => {
    append(publicationData);
    scrollToElement("body");
    setTimeout(() => {
      setSelectedKeys(new Set([fields.length.toString()]));
    }, 1);
  };

  return (
    <>
      <h2 className="mt-16 text-lg font-medium tracking-wide text-slate-800 flex items-center gap-x-2">
        <NewspaperIcon className="h-5 w-5 text-blue-600" />
        Publications
      </h2>
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
              title={field.title || "Nouvelle publication"}
            >
              <FormPublication
                control={control}
                watch={watch}
                index={index}
                remove={remove}
                fieldData={field}
                publications={publications}
                setData={setData}
              />
            </AccordionItem>
          ))}
        </Accordion>

        <div className="my-8 py-3 border-y-1 border-slate-400 border-dashed">
          <Button
            color="primary"
            variant="light"
            onPress={onAddPublication}
            startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
          >
            Ajouter une publication
          </Button>
        </div>
      </form>
    </>
  );
}
