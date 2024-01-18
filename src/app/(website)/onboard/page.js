import { TemplatePreview } from "@/components/builder/TemplatePreview";

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

export const metadata = {
  title: "SwissCVBuilder - Choix du modèle de CV",
  description: "Choisissez un modèle de CV gratuit.",
};

export default function Builder() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 my-8"
    >
      {templates.map((template) => (
        <TemplatePreview template={template} />
      ))}
    </ul>
  );
}
