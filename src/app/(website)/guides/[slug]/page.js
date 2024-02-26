import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import { GuideHeader } from "@/components/GuideHeader";
import { GuideContent } from "@/components/GuideContent";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { getGuides } from "@/lib/guides";

export async function generateMetadata({ params }) {
  const guide = getGuide(params);

  return {
    title: guide.metadata.title,
    description: guide.metadata.description,
  };
}

export default async function Guide({ params }) {
  const guide = getGuide(params);
  const content = await getGuideContent(guide);

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
                <GuideContent content={content} />
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
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

function getGuide(params) {
  return getGuides().find((guide) => guide.slug === params.slug);
}

async function getGuideContent(guide) {
  const mdxSource = await serialize(guide.content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  });

  return mdxSource;
}
