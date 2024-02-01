import { TemplatePreview } from "@/components/builder/TemplatePreview";
import { useResume } from "@/hooks/useResume";

export const metadata = {
  title: "SwissCVBuilder - Choix du modèle de CV",
  description: "Choisissez un modèle de CV gratuit.",
};

export default function Builder() {
  const { templates } = useResume();
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 my-8"
    >
      {templates.map((template) => (
        <TemplatePreview key={template.name} template={template} />
      ))}
    </ul>
  );
}
