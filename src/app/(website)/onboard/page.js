import { Container } from "@/components/Container";
import { TemplatePreview } from "@/components/builder/TemplatePreview";
import { useResume } from "@/hooks/useResume";
import { getUser } from "@/lib/actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "SwissCVBuilder - Choix du modèle de CV",
  description: "Choisissez un modèle de CV gratuit.",
};

export default async function Builder() {
  const { error } = await getUser();
  const { templates } = useResume();

  if (error) {
    return redirect("/login");
  }

  return (
    <div className="py-24 sm:py-32">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Sélectionnez votre modèle de CV
          </h2>
        </div>
        <section className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 my-8"
          >
            {templates.map((template) => (
              <TemplatePreview key={template.name} template={template} />
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
