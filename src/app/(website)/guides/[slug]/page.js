import { notFound } from "next/navigation";
import { allGuides } from "contentlayer/generated";

import { GuideHeader } from "@/components/GuideHeader";
import { GuideContent } from "@/components/GuideContent";
import { SocialShareButtons } from "@/components/SocialShareButtons";

export async function generateMetadata({ params }) {
  const guide = getGuide(params);

  return {
    title: guide.title,
    description: guide.description,
  };
}

export default function Guide({ params }) {
  const guide = getGuide(params);

  if (!guide) notFound();

  return (
    <>
      <GuideHeader guide={guide} />
      <article className="max-w-5xl mx-auto px-4 pb-16 sm:pb-24 sm:px-6 lg:px-8">
        <div className="pt-16 lg:pt-20 lg:pb-20">
          <div className="relative pb-16 px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-3xl mx-auto prose prose-blue md:prose-lg text-gray-500">
              <SocialShareButtons guide={guide} />
              <div className="py-12">
                <GuideContent content={guide.body.code} />
              </div>
              <div className="border-t border-slate-200 pt-12">
                <SocialShareButtons guide={guide} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export async function generateStaticParams() {
  return allGuides.map((guide) => ({ slug: guide.slug }));
}

function getGuide(params) {
  return allGuides.find((guide) => guide.slug === params.slug);
}
