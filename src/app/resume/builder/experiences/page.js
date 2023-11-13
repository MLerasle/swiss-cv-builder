"use client";

import { useRouter } from "next/navigation";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";

import FormExperience from "@/components/FormExperience";
import FormActions from "@/components/FormActions";
import useFormStore, { experienceData } from "@/store/useFormStore";

export default function WorkExperiences() {
  const router = useRouter();
  const { experiences, setData } = useFormStore();
  console.log({ experienceData });

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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Accordion
        variant="splitted"
        defaultSelectedKeys={[fields[fields.length - 1].id]}
        itemClasses={{
          title: "px-2 font-medium",
        }}
        className="my-8 px-0 gap-8"
      >
        {fields.map((field, index) => (
          <AccordionItem
            key={field.id}
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
