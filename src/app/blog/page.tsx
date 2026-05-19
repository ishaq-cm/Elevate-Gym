import { client } from "@/sanity/lib/client";

export default async function BlogPage() {
  // Step 1: Simple query se test karein (bina order ke)
  const posts = await client.fetch(`*[_type == "post" && defined(slug.current)] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author,
    _createdAt
  }`);

  // Step 2: Console mein check karein
  console.log("=== TOTAL POSTS FOUND ===", posts.length);
  console.log("=== FIRST POST ===", posts[0]);

  // Agar posts empty hain
  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl text-red-600">? No posts found</h1>
        <p className="text-gray-600 mt-4">Check Sanity dataset and schema</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Our Blog ({posts.length} posts)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <a
            key={post._id}
            href={`/blog/${post.slug?.current || "#"}`}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            {post.mainImage && (
              <img
                src={post.mainImage}
                alt={post.title || "Blog post"}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{post.title || "Untitled"}</h2>
              <p className="text-gray-600 mb-4">
                {post.excerpt || "No excerpt available"}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.author || "Unknown"}</span>
                <span>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : post._createdAt
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

