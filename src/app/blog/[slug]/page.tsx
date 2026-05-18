import { client } from "@/lib/sanity";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    {
      slug: params.slug,
    }
  );

  return (
    <article className="container mx-auto py-20 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex items-center gap-4 mb-8 text-gray-600">
        <span>{post.author}</span>
        <span>•</span>
        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
      </div>

      {post.mainImage && (
        <img
          src={post.mainImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}

      <div className="prose max-w-none">{post.body}</div>

      {post.tags && (
        <div className="mt-8 flex gap-2">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
