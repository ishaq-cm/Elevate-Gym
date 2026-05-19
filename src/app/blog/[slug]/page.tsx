import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {

  const post = await client.fetch(
    `*[_type=="post" && slug.current==$slug][0]{
      title,
      author,
      publishedAt,
      body,
      tags,
      "mainImage": mainImage.asset->url
    }`,
    {
      slug: params.slug
    }
  );

  return (
    <article className="bg-black text-white min-h-screen">

      {/* Hero Image */}
      {post.mainImage && (
        <div className="w-full">
          <img
            src={post.mainImage}
            alt={post.title}
            className="w-full h-[250px] md:h-[500px] object-cover"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Author + Date */}
        <div className="flex flex-wrap gap-4 items-center text-sm uppercase tracking-widest mb-6">
          <span className="text-red-500 font-bold">
            {post.author}
          </span>

          <span className="text-gray-500">•</span>

          <span className="text-gray-400">
            {new Date(post.publishedAt).toLocaleDateString()}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-10">
          {post.title}
        </h1>

        {/* Blog Content */}
        <div className="mt-10">
          <PortableText
            value={post.body}
            components={{
              block: {
                h1: ({children}) => (
                  <h1 className="text-4xl font-bold mt-12 mb-8">
                    {children}
                  </h1>
                ),

                h2: ({children}) => (
                  <h2 className="text-3xl font-bold text-red-500 mt-10 mb-6">
                    {children}
                  </h2>
                ),

                normal: ({children}) => (
                  <p className="text-gray-300 text-lg leading-9 mb-6">
                    {children}
                  </p>
                ),
              },

              list: {
                bullet: ({children}) => (
                  <ul className="list-disc pl-8 text-lg text-gray-300 mb-8 space-y-4">
                    {children}
                  </ul>
                ),
              },

              listItem: {
                bullet: ({children}) => (
                  <li>{children}</li>
                ),
              },
            }}
          />
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-3 mt-12 border-t border-gray-800 pt-8">
            {post.tags.map((tag:string) => (
              <span
                key={tag}
                className="bg-red-600/20 border border-red-500 text-red-400 px-4 py-2 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

      </div>
    </article>
  );
      }
