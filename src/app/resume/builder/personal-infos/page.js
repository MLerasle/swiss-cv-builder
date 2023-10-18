"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, SelectItem } from "@nextui-org/react";

import FormActions from "@/components/FormActions";
import HelpCard from "@/components/HelpCard";
import useFormStore from "@/store/useFormStore";
import { workPermits, nationalities } from "@/lib/select-options";
import { help } from "@/lib/help";

export default function PersonalInfos() {
  const router = useRouter();
  const { personalData, setData } = useFormStore();
  const [isHelpDisplayed, setIsHelpDisplayed] = useState(false);
  const [helpData, setHelpData] = useState([]);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: personalData });

  const onSubmit = (data) => {
    setData({ step: 1, data });
    router.push("/resume/builder/experiences");
  };

  const displayHelp = (fieldName) => {
    setHelpData(help[fieldName]);
    setIsHelpDisplayed(true);
  };

  const hideHelp = () => setIsHelpDisplayed(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <p className="text-gray-800 mt-8">Bienvenue 👋</p>
      <h1 className="text-3xl font-bold leading-8 text-gray-950 mt-2">
        Commencez à rédiger votre nouveau CV
      </h1> */}
      {/* <h2 className="text-xl font-semibold leading-7 text-gray-900 mt-8">
        1. Informations Personnelles
      </h2> */}
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Input label="Nom" autoFocus isRequired className="my-8" {...field} />
        )}
      />
      {errors.fullName && <span>Fullname is missing.</span>}

      <Controller
        name="title"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Input
            label="Intitulé du poste"
            isRequired
            className="my-8"
            onFocus={() => displayHelp("jobTitle")}
            onBlur={(e) => {
              onBlur(e);
              hideHelp();
            }}
            onChange={onChange}
            value={value}
          />
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
              <Input type="tel" label="Téléphone" isRequired {...field} />
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
                label="Nationalité"
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
                label="Possédez-vous un permis de travail ?"
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

      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-8">
          <Controller
            name="age"
            control={control}
            render={({ field }) => <Input label="Âge" {...field} />}
          />
        </div>

        <div className="sm:col-span-3 mt-8">
          <Controller
            name="linkedinUrl"
            control={control}
            render={({ field }) => (
              <Input label="Profile LinkedIn" {...field} />
            )}
          />
        </div>
      </div>

      <span className="block text-sm font-medium leading-6 text-gray-900 mt-8">
        Où résidez-vous ?
      </span>

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <Input label="Addresse" className="mt-1" {...field} />
        )}
      />
      {errors.address && <span>Address is missing.</span>}

      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-2 mt-8">
          <Controller
            name="nip"
            control={control}
            render={({ field }) => <Input label="NIP" {...field} />}
          />
          {errors.nip && <span>NIP is missing.</span>}
        </div>

        <div className="sm:col-span-2 mt-8">
          <Controller
            name="city"
            control={control}
            render={({ field }) => <Input label="Ville" {...field} />}
          />
          {errors.city && <span>City is missing.</span>}
        </div>

        <div className="sm:col-span-2 mt-8">
          <Controller
            name="country"
            control={control}
            render={({ field }) => <Input label="Pays" {...field} />}
          />
          {errors.country && <span>Country is missing.</span>}
        </div>
      </div>

      <FormActions />

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </form>
  );
}
