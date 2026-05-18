export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL ke liye)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
      description: 'Google search mein dikhne wala description',
      validation: (Rule: any) => Rule.max(160),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'text',
      rows: 2,
      description: 'Blog list mein dikhne wala summary',
    },
    {
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
    },
  ],
}
