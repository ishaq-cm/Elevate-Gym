// src/app/api/blog/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://mera-techh-blog.blogspot.com/feeds/posts/default?alt=json&max-results=10',
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 60 } // 60 second cache
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' }, 
      { status: 500 }
    );
  }
}
