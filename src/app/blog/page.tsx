import { client } from "@/sanity/lib/client";

export default async function BlogPage() {
  const posts =
    await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author
  }`);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Our Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <a
            key={post.slug.current}
            href={`/blog/${post.slug.current}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {post.mainImage && (
              <img
                src={post.mainImage}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.excerpt}</p>
              <span className="text-sm text-gray-500">{post.author}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
