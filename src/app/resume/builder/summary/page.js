"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { Button, Textarea } from "@nextui-org/react";

import useFormStore from "@/store/useFormStore";

export default function Summary() {
  const router = useRouter();
  const { summary, setData } = useFormStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: summary,
  });

  const onSubmit = (data) => {
    setData({ step: 5, data });
    router.push("/resume/preview");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-8">
        Résumé
      </h2>

      <Controller
        name="summary"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Textarea label="Résumé" isRequired className="mt-8" {...field} />
        )}
      />
      {errors.summary && <span>Summary is missing.</span>}

      <div className="flex justify-between items-center my-8">
        <Link href="/resume/builder/references" passHref legacyBehavior>
          <Button type="button">Previous</Button>
        </Link>
        <Button color="primary" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}
