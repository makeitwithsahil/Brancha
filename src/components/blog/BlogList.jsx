// src/components/blog/BlogList.jsx
import BlogCard from './BlogCard';

export default function BlogList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6B6B6B] text-lg" style={{ fontWeight: 400 }}>No blog posts yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}