"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormExperience from "@/components/FormExperience";
import FormActions from "@/components/FormActions";
import useFormStore, { experienceData } from "@/store/useFormStore";
import { scrollToElement } from "@/lib/scroll";

export default function WorkExperiences() {
  const router = useRouter();
  const { experiences, setData } = useFormStore();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobs: experiences.length > 0 ? experiences : [experienceData],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "jobs",
  });

  const onSubmit = (data) => {
    for (const job of data.jobs) {
      if (job.description.length > 0) {
        job.description = job.description.filter((d) => d.task !== "");
      }
    }
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
            title={field.company || "Nouvelle expérience"}
          >
            <FormExperience
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
        onPress={onAddJobExperience}
        startContent={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
      >
        Ajouter une expérience professionnelle
      </Button>

      <FormActions prevLink="/resume/builder/personal-infos" />
    </form>
  );
}
