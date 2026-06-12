'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogPost {
  id: { $t: string };
  title: { $t: string };
  published: { $t: string };
  content: { $t: string };
  link: Array<{ rel: string; href: string }>;
  media$thumbnail?: { url: string };
}

// ✅ ORIGINAL IMAGE URL — s72-c/s400 hatao
function getOriginalImage(url: string): string {
  return url.replace(/\/s\d+-c\//, '/').replace(/\/s\d+\//, '/');
}

// ✅ CONTENT SE ORIGINAL IMAGE NIKALO
function extractFirstImage(content: string): string | null {
  const match = content.match(/<img[^>]+src="([^"]+)"/);
  return match ? getOriginalImage(match[1]) : null;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        const entries = data.feed?.entry || [];
        setPosts(entries);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-12">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">BLOG</h1>
          <p className="text-gray-400">Latest posts from Blogger</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => {
            const postLink = post.link?.find(l => l.rel === 'alternate')?.href;
            const slug = postLink?.split('/').pop()?.replace('.html', '') || '';
            
            // ✅ ORIGINAL QUALITY IMAGE
            const rawThumbnail = extractFirstImage(post.content?.$t || '') 
              || post.media$thumbnail?.url;
            
            const thumbnail = rawThumbnail ? getOriginalImage(rawThumbnail) : null;
            
            const summary = post.content?.$t
              ?.replace(/<[^>]*>/g, ' ')
              ?.substring(0, 150) + '...' || '';

            return (
              <motion.article
                key={post.id?.$t || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-red-500 transition-all"
              >
                {/* ✅ ORIGINAL QUALITY IMAGE */}
                {thumbnail && (
                  <img 
                    src={thumbnail} 
                    alt={post.title?.$t}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                )}
                
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2">
                    {post.published?.$t && new Date(post.published.$t).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                  
                  <h2 className="text-xl font-semibold mb-3">
                    {post.title?.$t || 'Untitled'}
                  </h2>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {summary}
                  </p>
                  
                  <Link 
                    href={`/blog/${slug}`}
                    className="text-red-500 hover:text-red-400 transition-colors inline-flex items-center gap-1 text-sm font-medium"
                  >
                    Read Full Post →
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
