"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";

import useFormStore from "@/store/useFormStore";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

export default function Skills() {
  const router = useRouter();
  const { skills, setData } = useFormStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { skills },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = (data) => {
    setData({ step: 3, data });
    router.push("/resume/builder/education");
  };

  const onAddSkill = (event) => {
    if (event.key === "Enter" || event.type === "press") {
      append({ skill: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold leading-7 text-gray-900 mt-8">
        3. Compétences
      </h2>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 my-8">
        <div className="px-4 py-6 sm:p-8">
          <span className="block text-sm font-medium leading-6 text-gray-900">
            Ajoutez une à une les compétences que vous souhaitez mettre en avant
          </span>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center">
              <Controller
                name={`skills.${index}.skill`}
                control={control}
                render={({ field }) => (
                  <Input
                    className="my-4 max-w-sm"
                    onKeyDown={onAddSkill}
                    autoFocus
                    {...field}
                  />
                )}
              />
              {fields.length > 1 && fields.length !== index + 1 ? (
                <Button
                  color="danger"
                  variant="light"
                  type="button"
                  className="ml-2"
                  onPress={() => remove(index)}
                  startContent={
                    <TrashIcon className="h-4 w-4" aria-hidden="true" />
                  }
                >
                  Supprimer
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="light"
                  type="button"
                  className="ml-2"
                  onPress={onAddSkill}
                  startContent={
                    <PlusIcon className="h-4 w-4" aria-hidden="true" />
                  }
                >
                  Ajouter une compétence
                </Button>
              )}
            </div>
          ))}
          {errors.skills && <span>Skills are missing.</span>}
        </div>
      </div>

      <div className="flex justify-between items-center my-8">
        <Link href="/resume/builder/experiences" passHref legacyBehavior>
          <Button
            type="button"
            startContent={
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            }
          >
            Précédent
          </Button>
        </Link>
        <Button
          color="primary"
          type="submit"
          endContent={
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          }
        >
          Suivant
        </Button>
      </div>
    </form>
  );
}
