import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

export default defineConfig({
  name: "default",
  title: "Elevate Gym",
  projectId: "3l5aifnv",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      {
        name: "post",
        type: "document",
        title: "Post",
        fields: [
          // ===== BASIC FIELDS =====
          {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required().max(70),
          },
          {
            name: "slug",
            title: "Slug (URL ke liye)",
            type: "slug",
            options: {
              source: "title",
              maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
          },

          // ===== SEO FIELDS =====
          {
            name: "metaTitle",
            title: "Meta Title (SEO)",
            type: "string",
            description:
              "Google search mein dikhne wala title (50-60 characters)",
            validation: (Rule) =>
              Rule.max(60).warning("60 characters se zyada nahi hona chahiye"),
          },
          {
            name: "metaDescription",
            title: "Meta Description (SEO)",
            type: "text",
            rows: 3,
            description:
              "Google search mein dikhne wala description (150-160 characters)",
            validation: (Rule) =>
              Rule.max(160).warning(
                "160 characters se zyada nahi hona chahiye"
              ),
          },
          {
            name: "focusKeyword",
            title: "Focus Keyword (SEO)",
            type: "string",
            description: "Main keyword jiske liye aap rank karna chahte hain",
          },
          {
            name: "keywords",
            title: "Keywords (SEO)",
            type: "array",
            of: [{ type: "string" }],
            description: "Related keywords (comma separated)",
            options: {
              layout: "tags",
            },
          },

          // ===== CONTENT FIELDS =====
          {
            name: "excerpt",
            title: "Short Excerpt / Summary",
            type: "text",
            rows: 3,
            description: "Blog list mein dikhne wala summary (150 characters)",
            validation: (Rule) => Rule.max(150),
          },
          {
            name: "mainImage",
            title: "Featured Image",
            type: "image",
            options: {
              hotspot: true,
            },
            fields: [
              {
                name: "alt",
                title: "Alt Text (SEO)",
                type: "string",
                description: "Image ke liye alt text (SEO ke liye important)",
              },
              {
                name: "caption",
                title: "Caption",
                type: "string",
              },
            ],
          },
          {
            name: "body",
            title: "Body Content",
            type: "array",
            of: [
              {
                type: "block",
                styles: [
                  { title: "Normal", value: "normal" },
                  { title: "H1", value: "h1" },
                  { title: "H2", value: "h2" },
                  { title: "H3", value: "h3" },
                  { title: "H4", value: "h4" },
                  { title: "Quote", value: "blockquote" },
                ],
                lists: [
                  { title: "Bullet", value: "bullet" },
                  { title: "Number", value: "number" },
                ],
                marks: {
                  decorators: [
                    { title: "Bold", value: "strong" },
                    { title: "Italic", value: "em" },
                    { title: "Underline", value: "underline" },
                    { title: "Code", value: "code" },
                  ],
                  annotations: [
                    {
                      name: "link",
                      type: "object",
                      title: "External Link",
                      fields: [
                        {
                          name: "href",
                          type: "url",
                          title: "URL",
                        },
                        {
                          name: "blank",
                          type: "boolean",
                          title: "Open in new tab",
                          initialValue: true,
                        },
                      ],
                    },
                  ],
                },
              },
              { type: "image" },
              { type: "file" },
            ],
          },

          // ===== AUTHOR & DATE =====
          {
            name: "author",
            title: "Author Name",
            type: "string",
          },
          {
            name: "publishedAt",
            title: "Published Date",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
          },
          {
            name: "updatedAt",
            title: "Last Updated",
            type: "datetime",
          },

          // ===== CATEGORIES & TAGS =====
          {
            name: "category",
            title: "Category",
            type: "string",
            options: {
              list: [
                { title: "Fitness", value: "fitness" },
                { title: "Nutrition", value: "nutrition" },
                { title: "Workout", value: "workout" },
                { title: "Health Tips", value: "health-tips" },
                { title: "Gym Guide", value: "gym-guide" },
              ],
            },
          },
          {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            options: {
              layout: "tags",
            },
          },

          // ===== SOCIAL SHARING =====
          {
            name: "ogTitle",
            title: "Social Media Title (Open Graph)",
            type: "string",
            description: "Facebook/Twitter pe share hone wala title",
          },
          {
            name: "ogDescription",
            title: "Social Media Description",
            type: "text",
            rows: 2,
          },
          {
            name: "ogImage",
            title: "Social Media Image",
            type: "image",
            description: "Facebook/Twitter pe dikhne wali image",
          },

          // ===== ADVANCED SEO =====
          {
            name: "canonicalUrl",
            title: "Canonical URL",
            type: "url",
            description: "Agar original post kisi aur URL pe hai",
          },
          {
            name: "noIndex",
            title: "No Index",
            type: "boolean",
            description: "Search engines ko index karne se rokne ke liye",
            initialValue: false,
          },
          {
            name: "readingTime",
            title: "Reading Time (minutes)",
            type: "number",
            description: "Kitne minute mein padha ja sakta hai",
          },

          // ===== STATUS =====
          {
            name: "featured",
            title: "Featured Post",
            type: "boolean",
            description: "Homepage pe dikhana hai?",
            initialValue: false,
          },
        ],

        // ===== PREVIEW CONFIG =====
        preview: {
          select: {
            title: "title",
            author: "author",
            media: "mainImage",
          },
          prepare(selection) {
            const { author } = selection;
            return Object.assign({}, selection, {
              subtitle: author ? `by ${author}` : "",
            });
          },
        },
      },
    ],
  },
});
