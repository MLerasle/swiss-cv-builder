"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

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
        <li key={template.name} className="relative">
          <div className="group aspect-h-8 aspect-w-6 block w-full overflow-hidden rounded-lg shadow-lg bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <Image
              className="pointer-events-none group-hover:opacity-40 transition-opacity duration-500 ease-out"
              src={template.preview}
              alt=""
              width={200}
              height={380}
              placeholder="blur"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
              onClick={() => selectTemplate(template.name)}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in text-white font-medium bg-blue-600 px-4 py-2 rounded-full">
                Selectionner ce modèle
              </span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
