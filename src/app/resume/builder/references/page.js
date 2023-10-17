"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";

import FormReference from "@/components/FormReference";
import useFormStore from "@/store/useFormStore";
import { referenceData } from "@/store/data";

export default function WorkExperiences() {
  const router = useRouter();
  const { references, setData } = useFormStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      references,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "references",
  });

  const onSubmit = (data) => {
    setData({ step: 6, data: data.references });
    router.push("/resume/builder/summary");
  };

  const onAddReference = () => {
    append(referenceData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-8">
        Références
      </h2>

      {fields.map((field, index) => (
        <FormReference
          control={control}
          errors={errors}
          key={field.id}
          index={index}
          remove={remove}
        />
      ))}

      <Button color="primary" variant="light" onPress={onAddReference}>
        Add more references
      </Button>
      <div className="flex justify-between items-center my-8">
        <Link href="/resume/builder/certifications" passHref legacyBehavior>
          <Button type="button">Previous</Button>
        </Link>
        <Button color="primary" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}
