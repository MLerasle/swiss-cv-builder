"use client";

import { useRouter } from "next/navigation";

import { MyImage } from "@/components/MyImage";
import useFormStore from "@/store/useFormStore";

import Template1 from "@/images/templates/template1.png";
import Template2 from "@/images/templates/template2.png";
import Template3 from "@/images/templates/template3.png";
import Template4 from "@/images/templates/template4.png";

const templates = [
  { name: "template1", preview: Template1 },
  { name: "template2", preview: Template2 },
  { name: "template3", preview: Template3 },
  { name: "template4", preview: Template4 },
];

export default function Builder() {
  const router = useRouter();
  const { setTemplate } = useFormStore();

  const selectTemplate = (name) => {
    setTemplate(name);
    router.push("/resume/builder/personal-infos");
  };

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 my-8"
    >
      {templates.map((template) => (
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
      ))}
    </ul>
  );
}
