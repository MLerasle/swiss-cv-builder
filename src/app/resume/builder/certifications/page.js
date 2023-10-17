"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useForm, useFieldArray } from "react-hook-form";

import FormCertification from "@/components/FormCertification";
import useFormStore from "@/store/useFormStore";
import { certificationData } from "@/store/data";

export default function Certifications() {
  const router = useRouter();
  const { certifications, setData } = useFormStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      certifications,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  const onSubmit = (data) => {
    setData({ step: 5, data: data.certifications });
    router.push("/resume/builder/references");
  };

  const onAddCertification = () => {
    append(certificationData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-8">
        Certifications
      </h2>

      {fields.map((field, index) => (
        <FormCertification
          control={control}
          errors={errors}
          key={field.id}
          index={index}
          remove={remove}
        />
      ))}

      <Button color="primary" variant="light" onPress={onAddCertification}>
        Add more certifications
      </Button>
      <div className="flex justify-between items-center my-8">
        <Link href="/resume/builder/education" passHref legacyBehavior>
          <Button type="button">Previous</Button>
        </Link>
        <Button color="primary" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}
