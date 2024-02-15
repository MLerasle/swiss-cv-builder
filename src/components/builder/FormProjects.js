"use client";

import { useState } from "react";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";
import { InboxStackIcon } from "@heroicons/react/24/outline";

import FormProject from "@/components/builder/FormProject";
import useFormStore, { projectData } from "@/store/useFormStore";
import { scrollToElement } from "@/lib/scroll";

export function FormProjects() {
  const { projects, setData } = useFormStore();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  const { control, watch } = useForm({
    defaultValues: { projects },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const onAddProject = () => {
    append(projectData);
    scrollToElement("body");
    setTimeout(() => {
      setSelectedKeys(new Set([fields.length.toString()]));
    }, 1);
  };

  return (
    <>
      <h2 className="mt-16 text-lg font-medium tracking-wide text-slate-800 flex items-center gap-x-2">
        <InboxStackIcon className="h-5 w-5 text-blue-600" />
        Projets personnels
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
            <AccordionItem key={index} title={field.title || "Nouveau projet"}>
              <FormProject
                control={control}
                watch={watch}
                index={index}
                remove={remove}
                fieldData={field}
                projects={projects}
                setData={setData}
              />
            </AccordionItem>
          ))}
        </Accordion>

        <div className="my-8 py-3 border-y-1 border-slate-400 border-dashed">
          <Button
            color="primary"
            variant="light"
            onPress={onAddProject}
            startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
          >
            Ajouter un projet personnel
          </Button>
        </div>
      </form>
    </>
  );
}
