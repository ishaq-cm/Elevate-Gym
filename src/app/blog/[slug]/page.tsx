'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// ✅ ORIGINAL IMAGE URL
function getOriginalImage(url: string): string {
  return url.replace(/\/s\d+-c\//, '/').replace(/\/s\d+\//, '/');
}

// ✅ CONTENT SE PEHLI IMAGE NIKALO
function extractFirstImage(content: string): string | null {
  const match = content.match(/<img[^>]+src="([^"]+)"/);
  return match ? getOriginalImage(match[1]) : null;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        const posts = data.feed?.entry || [];
        const found = posts.find((p: any) => {
          const postUrl = p.link?.find((l: any) => l.rel === 'alternate')?.href;
          return postUrl?.includes(slug);
        });
        setPost(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white p-12">
        <h1 className="text-2xl mb-4">Post not found</h1>
        <Link href="/blog" className="text-red-500 hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  const contentHtml = post.content?.$t || '';
  const originalImage = extractFirstImage(contentHtml);
  let content = contentHtml.replace(/<img[^>]*>/i, '');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        
        <Link href="/blog" className="text-red-500 hover:underline mb-8 inline-block">
          ← Back to Blog
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title?.$t}</h1>
          
          <p className="text-gray-400 mb-6">
            {new Date(post.published?.$t).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>

          {/* ✅ ORIGINAL QUALITY FEATURED IMAGE */}
          {originalImage && (
            <img 
              src={originalImage} 
              alt={post.title?.$t}
              className="w-full rounded-xl mb-8 object-cover"
              loading="lazy"
              decoding="async"
            />
          )}

          <div 
            className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </motion.article>
      </div>
    </div>
  );
}
