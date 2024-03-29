import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const Guide = defineDocumentType(() => ({
  name: "Guide",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    image: { type: "string", required: true },
    date: { type: "string", required: true },
    description: { type: "string", required: true },
    lang: { type: "string", required: true },
  },
  computedFields: {
    slug: { type: "string", resolve: (doc) => doc._raw.flattenedPath },
  },
}));

export default makeSource({
  contentDirPath: "src/data/guides",
  documentTypes: [Guide],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});
