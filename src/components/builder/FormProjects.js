"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormProject from "@/components/builder/FormProject";
import FormActions from "@/components/builder/FormActions";
import useFormStore, { projectData } from "@/store/useFormStore";
import { scrollToElement } from "@/lib/scroll";

export function FormProjects() {
  const router = useRouter();
  const { projects, setData } = useFormStore();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { projects } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const onSubmit = () => {
    router.push("/resume/builder/hobbies");
  };

  const onAddProject = () => {
    append(projectData);
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
          trigger: "data-[focus-visible=true]:outline-transparent",
        }}
        className="my-8 px-0 gap-8"
      >
        {fields.map((field, index) => (
          <AccordionItem key={index} title={field.title || "Nouveau projet"}>
            <FormProject
              control={control}
              watch={watch}
              errors={errors}
              index={index}
              remove={remove}
              fieldData={field}
              projects={projects}
              setData={setData}
            />
          </AccordionItem>
        ))}
      </Accordion>

      <div className="py-3 border-y-1 border-slate-400 border-dashed">
        <Button
          color="primary"
          variant="light"
          onPress={onAddProject}
          startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Ajouter un projet personnel
        </Button>
      </div>

      <FormActions prevLink="/resume/builder/references" />
    </form>
  );
}
