"use client";

import { useRouter } from "next/navigation";

import { MyImage } from "@/components/MyImage";
import useFormStore from "@/store/useFormStore";

export function TemplatePreview({ template }) {
  const router = useRouter();
  const { setTemplate } = useFormStore();

  const selectTemplate = (name) => {
    setTemplate(name);
    router.push("/resume/builder/personal-infos");
  };

  return (
    <li key={template.name} className="flex flex-col justify-center">
      <div className="group block w-full overflow-hidden rounded-lg shadow-lg bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <MyImage src={template.preview} alt={template.name} height="8000" />
      </div>
      <button
        type="button"
        className="mt-6"
        onClick={() => selectTemplate(template.name)}
      >
        <span className=" text-white font-medium bg-blue-600 px-4 py-2 rounded-full">
          Selectionner ce modèle
        </span>
      </button>
    </li>
  );
}
