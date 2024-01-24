"use client";

import { useMDXComponent } from "next-contentlayer/hooks";

import { Toc } from "@/components/Toc";

const mdxComponents = {
  Toc,
};

export function GuideContent({ content }) {
  const GuideMDXContent = useMDXComponent(content);

  return (
    <div className="js-toc-content">
      <GuideMDXContent components={mdxComponents} />
    </div>
  );
}
