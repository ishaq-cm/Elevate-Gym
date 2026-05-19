import { client } from "@/sanity/lib/client";

export default async function BlogPage() {
  const posts = await client.fetch(`*[_type=="post" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author,
    _createdAt,
    "mainImage": mainImage.asset->url
  }`);

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl">No posts found</h1>
        <p>Check Sanity Studio for published posts</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <a
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            {post.mainImage && (
              <img
                src={post.mainImage}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt || "No excerpt"}</p>
              <div className="text-sm text-gray-500">
                <span>
                  {post._createdAt
                    ? new Date(post._createdAt).toLocaleDateString()
                    : "No date"}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

