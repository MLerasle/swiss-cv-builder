"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { SelectItem, Avatar, Button } from "@nextui-org/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

import FormActions from "@/components/builder/FormActions";
import HelpCard from "@/components/builder/HelpCard";
import { BaseInputPhone } from "@/components/UI/BaseInputPhone";
import { BaseInput } from "@/components/UI/BaseInput";
import { BaseSelect } from "@/components/UI/BaseSelect";
import useFormStore from "@/store/useFormStore";
import { workPermits } from "@/lib/select-options";
import { useHelp } from "@/hooks/useHelp";

export function FormPersonalInfos() {
  const router = useRouter();
  const hiddenInputRef = useRef();
  const ageInputRef = useRef();
  const [previewImage, setPreviewImage] = useState(null);
  const { personalData, setData } = useFormStore();
  const { helpData, displayHelp, hideHelp, isHelpDisplayed } = useHelp();
  const {
    control,
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: personalData });

  const { ref: registerRef, ...rest } = register("profilePicture");

  const handleUploadedFile = (event) => {
    const file = event.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setPreviewImage(urlImage);
  };

  const onUpload = () => {
    hiddenInputRef.current.click();
  };

  const onSubmit = async (data) => {
    // const formData = new FormData();
    // formData.set("picture", data.profilePicture[0]);
    // const response = await fetch("/api/picture", {
    //   method: "post",
    //   body: formData,
    // });
    setData({ step: 1, data });
    router.push("/resume/builder/experiences");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* <input
      type="file"
      name="profilePicture"
      onInput={handleUploadedFile}
      ref={(e) => {
        registerRef(e);
        hiddenInputRef.current = e;
      }}
      style={{ display: "none" }}
      {...rest}
    />

    <div className="mt-8 flex items-center gap-x-3">
      <Avatar
        src={previewImage}
        className="w-20 h-20 text-large"
        showFallback
        fallback={
          <UserCircleIcon className="h-20 w-20 bg-white text-gray-300" />
        }
      />
      <Button color="default" variant="bordered" onClick={onUpload}>
        Change Photo
      </Button>
    </div> */}

      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Nom"
            autoFocus
            isRequired
            isInvalid={!!errors.name}
            errorMessage={!!errors.name && "Veuillez renseigner votre nom."}
            className="my-8"
            onBlur={(e) => {
              onBlur(e);
              setData({
                step: 1,
                data: { ...personalData, name: e.target.value },
              });
            }}
            {...field}
          />
        )}
      />

      <Controller
        name="title"
        control={control}
        render={({ field: { onBlur, ...field } }) => (
          <BaseInput
            label="Intitulé du poste"
            className="my-8"
            onFocus={() => displayHelp("jobTitle")}
            onBlur={(e) => {
              onBlur(e);
              hideHelp();
              setData({
                step: 1,
                data: { ...personalData, title: e.target.value },
              });
            }}
            {...field}
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
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                type="email"
                label="Email"
                onFocus={() => displayHelp("emailAddress")}
                onBlur={(e) => {
                  onBlur(e);
                  hideHelp();
                  setData({
                    step: 1,
                    data: { ...personalData, email: e.target.value },
                  });
                }}
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
            render={({ field: { onBlur, ref, ...field } }) => (
              <BaseInputPhone
                onFocus={() => displayHelp("phone")}
                onBlur={(e) => {
                  onBlur(e);
                  hideHelp();
                  setData({
                    step: 1,
                    data: { ...personalData, tel: e.target.value },
                  });
                }}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-8">
          <Controller
            name="nationality"
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                label="Nationalité"
                onFocus={() => displayHelp("nationality")}
                onBlur={(e) => {
                  onBlur(e);
                  e.target.value?.toLowerCase() === "suisse" &&
                    ageInputRef.current.focus();
                  hideHelp();
                  setData({
                    step: 1,
                    data: { ...personalData, nationality: e.target.value },
                  });
                }}
                {...field}
              />
            )}
          />
        </div>

        <div className="sm:col-span-3 mt-8">
          <Controller
            name="permit"
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseSelect
                variant="bordered"
                label="Possédez-vous un permis de travail ?"
                defaultSelectedKeys={
                  personalData.permit && personalData.permit !== ""
                    ? [personalData.permit]
                    : null
                }
                isDisabled={watch("nationality")?.toLowerCase() === "suisse"}
                onFocus={() => displayHelp("workPermit")}
                onBlur={(e) => {
                  onBlur(e);
                  hideHelp();
                  setData({
                    step: 1,
                    data: { ...personalData, permit: e.target.value },
                  });
                }}
                {...field}
              >
                {workPermits.map((permit) => (
                  <SelectItem key={permit} value={permit}>
                    {permit}
                  </SelectItem>
                ))}
              </BaseSelect>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-8">
          <Controller
            name="age"
            control={control}
            render={({ field: { onBlur, ref, ...field } }) => (
              <BaseInput
                label="Âge"
                type="number"
                ref={ageInputRef}
                onFocus={() => displayHelp("age")}
                onBlur={(e) => {
                  onBlur(e);
                  hideHelp();
                  setData({
                    step: 1,
                    data: { ...personalData, age: e.target.value },
                  });
                }}
                {...field}
              />
            )}
          />
        </div>

        <div className="sm:col-span-3 mt-8">
          <Controller
            name="linkedinUrl"
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                label="Profil LinkedIn"
                placeholder="https://www.linkedin.com/in/username/"
                onBlur={(e) => {
                  onBlur(e);
                  setData({
                    step: 1,
                    data: { ...personalData, linkedinUrl: e.target.value },
                  });
                }}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <span className="block text-sm font-medium leading-6 text-gray-900 mt-8">
        Où résidez-vous ?
      </span>

      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-1">
          <Controller
            name="city"
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                label="Ville"
                onBlur={(e) => {
                  onBlur(e);
                  setData({
                    step: 1,
                    data: { ...personalData, city: e.target.value },
                  });
                }}
                {...field}
              />
            )}
          />
        </div>

        <div className="sm:col-span-3 mt-8 sm:mt-1">
          <Controller
            name="country"
            control={control}
            render={({ field: { onBlur, ...field } }) => (
              <BaseInput
                label="Pays"
                onBlur={(e) => {
                  onBlur(e);
                  setData({
                    step: 1,
                    data: { ...personalData, country: e.target.value },
                  });
                }}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <FormActions />

      {isHelpDisplayed && <HelpCard content={helpData} onClose={hideHelp} />}
    </form>
  );
}
