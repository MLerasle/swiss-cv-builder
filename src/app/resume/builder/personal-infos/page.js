"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

import useFormStore from "@/store/useFormStore";

const nationalities = ["Française", "Suisse"];
const workPermits = ["Aucun", "Permis B", "Permis C", "Permis G", "Permis L"];

export default function PersonalInfos() {
  const router = useRouter();
  const { personalData, setData } = useFormStore();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: personalData,
  });

  const onSubmit = (data) => {
    setData({ step: 1, data });
    router.push("/resume/builder/work-experiences");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-8">
        Informations Personnelles
      </h2>
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Input label="Name" isRequired className="my-8" {...field} />
        )}
      />
      {errors.fullName && <span>Fullname is missing.</span>}

      <Controller
        name="title"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Input label="Job Title" isRequired className="my-8" {...field} />
        )}
      />
      {errors.title && <span>Job Title is missing.</span>}

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: /^\S+@\S+$/i,
            }}
            render={({ field }) => (
              <Input type="email" label="Email" isRequired {...field} />
            )}
          />
          {errors.email && <span>Email is missing.</span>}
        </div>

        <div className="sm:col-span-3">
          <Controller
            name="tel"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input type="tel" label="Phone Number" isRequired {...field} />
            )}
          />
          {errors.tel && <span>Tel is missing.</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-8">
          <Controller
            name="nationality"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                label="Nationality"
                defaultSelectedKeys={
                  personalData.nationality !== ""
                    ? [personalData.nationality]
                    : []
                }
                {...field}
              >
                {nationalities.map((nationality) => (
                  <SelectItem key={nationality} value={nationality}>
                    {nationality}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          {errors.nationality && <span>Nationality is missing.</span>}
        </div>
        <div className="sm:col-span-3 mt-8">
          <Controller
            name="permit"
            control={control}
            rules={{
              required: watch("nationality") !== "Suisse",
            }}
            render={({ field }) => (
              <Select
                label="Quel permis de travail possédez-vous ?"
                defaultSelectedKeys={
                  personalData.permit !== "" ? [personalData.permit] : []
                }
                isDisabled={watch("nationality") === "Suisse"}
                {...field}
              >
                {workPermits.map((permit) => (
                  <SelectItem key={permit} value={permit}>
                    {permit}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          {errors.permit && <span>Residence Permit is missing.</span>}
        </div>
      </div>

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <Input label="Address" className="my-8" {...field} />
        )}
      />
      {errors.address && <span>Address is missing.</span>}

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <Controller
            name="nip"
            control={control}
            render={({ field }) => <Input label="Nip" {...field} />}
          />
          {errors.nip && <span>NIP is missing.</span>}
        </div>

        <div className="sm:col-span-2">
          <Controller
            name="city"
            control={control}
            render={({ field }) => <Input label="City" {...field} />}
          />
          {errors.city && <span>City is missing.</span>}
        </div>

        <div className="sm:col-span-2">
          <Controller
            name="country"
            control={control}
            render={({ field }) => <Input label="Country" {...field} />}
          />
          {errors.country && <span>Country is missing.</span>}
        </div>
      </div>

      <div className="flex justify-end my-8">
        <Button color="primary" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}
