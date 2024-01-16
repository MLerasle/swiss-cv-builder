"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormProject from "@/components/FormProject";
import FormActions from "@/components/FormActions";
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
  } = useForm({
    defaultValues: { projects: projects.length > 0 ? projects : [projectData] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const onSubmit = (data) => {
    setData({ step: 8, data: data.projects });
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
          <AccordionItem key={index} title={field.title || "Nouveau projet"}>
            <FormProject
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
        onPress={onAddProject}
        startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
      >
        Ajouter un projet personnel
      </Button>

      <FormActions prevLink="/resume/builder/references" />
    </form>
  );
}
