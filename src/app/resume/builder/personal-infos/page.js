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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Input
            label="Nom"
            autoFocus
            isRequired
            isInvalid={!!errors.name}
            errorMessage={!!errors.name && "Veuillez renseigner votre nom."}
            className="my-8"
            {...field}
          />
        )}
      />

      <Controller
        name="title"
        control={control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Input
            label="Intitulé du poste"
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
              <Input
                type="email"
                label="Email"
                isRequired
                isInvalid={!!errors.email}
                errorMessage={
                  !!errors.email &&
                  "Veuillez renseigner unde adresse email valide."
                }
                {...field}
              />
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <Controller
            name="tel"
            control={control}
            render={({ field }) => (
              <Input type="tel" label="Téléphone" {...field} />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-8">
          <Controller
            name="nationality"
            control={control}
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
        </div>

        <div className="sm:col-span-3 mt-8">
          <Controller
            name="permit"
            control={control}
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

      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-2 mt-8">
          <Controller
            name="nip"
            control={control}
            render={({ field }) => <Input label="NIP" {...field} />}
          />
        </div>

        <div className="sm:col-span-2 mt-8">
          <Controller
            name="city"
            control={control}
            render={({ field }) => <Input label="Ville" {...field} />}
          />
        </div>

        <div className="sm:col-span-2 mt-8">
          <Controller
            name="country"
            control={control}
            render={({ field }) => <Input label="Pays" {...field} />}
          />
        </div>
      </div>

      <FormActions />

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </form>
  );
}
