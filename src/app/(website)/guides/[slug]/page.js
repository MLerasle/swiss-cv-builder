// import { Container } from "@/components/Container";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allGuides } from "contentlayer/generated";

// export const metadata = {
//   title: "SwissCVBuilder - Comment faire un CV Suisse ?",
//   description:
//     "Le guide complet étape par étape pour rédiger un CV Suisse efficace.",
// };

export default function Guide({ params }) {
  const guide = getGuide(params);

  if (!guide) notFound();

  const GuideMDXContent = useMDXComponent(guide.body.code);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16 sm:pb-24 sm:px-6 lg:px-8">
      <div className="lg:pt-14 lg:pb-20">
        <div className="relative pb-16 px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-5xl mx-auto prose prose-blue md:prose-lg text-gray-500">
            <GuideMDXContent />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return allGuides.map((guide) => ({ slug: guide.slug }));
}

function getGuide(params) {
  const guide = allGuides.find((guide) => guide.slug === params.slug);
  console.log({ guide });
  return guide;
}
