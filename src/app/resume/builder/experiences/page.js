"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";

import FormExperience from "@/components/FormExperience";
import useFormStore from "@/store/useFormStore";
import { experienceData } from "@/store/data";

export default function WorkExperiences() {
  const router = useRouter();
  const { experiences, setData } = useFormStore();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobs: experiences,
    },
  });
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-8">
        Expériences Professionelles
      </h2>

      {fields.map((field, index) => (
        <FormExperience
          control={control}
          watch={watch}
          errors={errors}
          key={field.id}
          index={index}
          remove={remove}
        />
      ))}

      <Button color="primary" variant="light" onPress={onAddJobExperience}>
        Add Job Experience
      </Button>
      <div className="flex justify-between items-center my-8">
        <Link href="/resume/builder/personal-infos" passHref legacyBehavior>
          <Button>Previous</Button>
        </Link>
        <Button color="primary" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}
