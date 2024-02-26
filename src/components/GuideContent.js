"use client";

import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";

import { Toc } from "@/components/Toc";

const mdxComponents = {
  Toc,
  Link,
};

export function GuideContent({ content }) {
  return (
    <div className="js-toc-content">
      <MDXRemote {...content} components={mdxComponents} />
    </div>
  );
}
