// src/app/blog/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: { $t: string };
  title: { $t: string };
  published: { $t: string };
  content: { $t: string };
  link: Array<{ rel: string; href: string }>;
  media$thumbnail?: { url: string };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Apni API se fetch karo, direct Blogger se nahi
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

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <div className="text-gray-400">Loading posts...</div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-red-400 mb-2">Error: {error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="text-blue-400 hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl">No posts found</div>
            <div className="text-gray-500 mt-2">
              Make sure your blog has published posts
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => {
            const postLink = post.link?.find(l => l.rel === 'alternate')?.href;
            const thumbnail = post.media$thumbnail?.url?.replace('s72-c', 's400');
            
            // HTML se text extract
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
                {thumbnail && (
                  <img 
                    src={thumbnail} 
                    alt={post.title?.$t}
                    className="w-full h-48 object-cover"
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
                  
                  <a 
                    href={postLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400 transition-colors inline-flex items-center gap-1 text-sm font-medium"
                  >
                    Read Full Post →
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
