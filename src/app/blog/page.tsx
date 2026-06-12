'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Blogger ka URL yahan daalo
const BLOG_URL = 'https://mera-tech-blog.blogspot.com';

interface BlogPost {
  id: { $t: string };
  title: { $t: string };
  published: { $t: string };
  content: { $t: string };
  link: Array<{ rel: string; href: string; title?: string }>;
  media$thumbnail?: { url: string };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BLOG_URL}/feeds/posts/default?alt=json`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.feed.entry || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Blog</h1>
          <p className="text-slate-400">Latest posts from Blogger</p>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => {
            const postLink = post.link.find(l => l.rel === 'alternate')?.href;
            const thumbnail = post.media$thumbnail?.url?.replace('s72-c', 's400') || '';
            
            // HTML se plain text nikaalna
            const summary = post.content.$t
              .replace(/<[^>]*>/g, ' ')
              .substring(0, 150) + '...';

            return (
              <motion.article
                key={post.id.$t}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-500 transition-all"
              >
                {/* Featured Image */}
                {thumbnail && (
                  <img 
                    src={thumbnail} 
                    alt={post.title.$t}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-6">
                  {/* Date */}
                  <p className="text-slate-400 text-sm mb-2">
                    {new Date(post.published.$t).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </p>
                  
                  {/* Title */}
                  <h2 className="text-xl font-semibold text-white mb-3">
                    {post.title.$t}
                  </h2>
                  
                  {/* Summary */}
                  <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                    {summary}
                  </p>
                  
                  {/* Read More Link */}
                  <a 
                    href={postLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 text-sm font-medium"
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
