'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        const posts = data.feed?.entry || [];
        // Post find karo by URL match
        const found = posts.find((p: any) => 
          p.link.find((l: any) => l.rel === 'alternate')?.href.includes(slug)
        );
        setPost(found);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-white p-12">Loading...</div>;
  if (!post) return <div className="text-white p-12">Post not found</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-4">{post.title.$t}</h1>
          <p className="text-gray-400 mb-8">
            {new Date(post.published.$t).toLocaleDateString()}
          </p>
          
          {/* Featured Image */}
          {post.media$thumbnail?.url && (
            <img 
              src={post.media$thumbnail.url.replace('s72-c', 's800')} 
              alt={post.title.$t}
              className="w-full rounded-xl mb-8"
            />
          )}
          
          {/* Full Content */}
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.$t }}
          />
        </motion.article>
      </div>
    </div>
  );
}
