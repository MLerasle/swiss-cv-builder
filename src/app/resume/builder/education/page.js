"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";

import FormEducation from "@/components/FormEducation";
import useFormStore from "@/store/useFormStore";
import { trainingData } from "@/store/data";

export default function WorkExperiences() {
  const router = useRouter();
  const { education, setData } = useFormStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = (data) => {
    setData({ step: 4, data: data.education });
    router.push("/resume/builder/references");
  };

  const onAddEducation = () => {
    append(trainingData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-8">
        Formation
      </h2>

      {fields.map((field, index) => (
        <FormEducation
          control={control}
          errors={errors}
          key={field.id}
          index={index}
          remove={remove}
        />
      ))}

      <Button color="primary" variant="light" onPress={onAddEducation}>
        Add more education history
      </Button>
      <div className="flex justify-between items-center my-8">
        <Link href="/resume/builder/skills" passHref legacyBehavior>
          <Button type="button">Previous</Button>
        </Link>
        <Button color="primary" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}
