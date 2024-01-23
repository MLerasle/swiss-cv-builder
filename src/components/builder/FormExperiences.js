"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormExperience from "@/components/builder/FormExperience";
import FormActions from "@/components/builder/FormActions";
import useFormStore, { experienceData } from "@/store/useFormStore";
import { scrollToElement } from "@/lib/scroll";

export function FormExperiences() {
  const router = useRouter();
  const { experiences, setData } = useFormStore();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { jobs: experiences } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "jobs",
  });

  const onSubmit = (data) => {
    setData({ step: 2, data: data.jobs });
    router.push("/resume/builder/skills");
  };

  const onAddJobExperience = () => {
    append(experienceData);
    scrollToElement("body");
    setTimeout(() => {
      setSelectedKeys(new Set([fields.length.toString()]));
    }, 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <span className="block text-sm font-medium leading-6 text-slate-500 mt-2">
        Commencez par le poste le plus récent
      </span>
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
            title={field.company || "Nouvelle expérience"}
          >
            <FormExperience
              control={control}
              watch={watch}
              errors={errors}
              index={index}
              remove={remove}
              fieldData={field}
              experiences={experiences}
              setData={setData}
            />
          </AccordionItem>
        ))}
      </Accordion>

      <div className="py-3 border-y-1 border-slate-400 border-dashed">
        <Button
          color="primary"
          variant="light"
          onPress={onAddJobExperience}
          startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
        >
          Ajouter une expérience professionnelle
        </Button>
      </div>

      <FormActions prevLink="/resume/builder/personal-infos" />
    </form>
  );
}
