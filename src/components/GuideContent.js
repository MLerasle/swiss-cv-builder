"use client";

import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";

import { Toc } from "@/components/Toc";

const mdxComponents = {
  Toc,
  a: ({ href, children }) => <Link href={href}>{children}</Link>,
};

export function GuideContent({ content }) {
  const GuideMDXContent = useMDXComponent(content);

  return (
    <div className="js-toc-content">
      <GuideMDXContent components={mdxComponents} />
    </div>
  );
}
