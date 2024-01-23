import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Guide = defineDocumentType(() => ({
  name: 'Guide',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    datetime: { type: 'string', required: true },
    description: { type: 'string', required: true },
    lang: { type: 'string', required: true },
  },
  computedFields: {
    slug: { type: 'string', resolve: (guide) => guide._raw.flattenedPath },
  },
}))

export default makeSource({
  contentDirPath: 'src/data/guides',
  documentTypes: [Guide],
})