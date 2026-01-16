// src/components/blog/BlogCard.jsx
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/blogUtils';

const BlogCard = memo(({ post, index }) => {
  return (
    <Link to={`/blog/${post.slug}`}>
      <article className="group relative p-5 sm:p-6 bg-white border border-[#EFEDE9] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#e2493b]/30 hover:shadow-lg hover:shadow-[#e2493b]/5">
        <div className="relative z-10">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 bg-[#e2493b]/10 rounded-full mb-3">
            <span className="text-xs font-semibold text-[#e2493b] tracking-wider" style={{ fontWeight: 600 }}>
              {formatDate(post.date)}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-medium text-[#1F1F1F] mb-2.5 leading-snug transition-colors duration-300 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
            {post.title}
          </h2>

          <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed mb-4 transition-colors duration-300 group-hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
            {post.excerpt}
          </p>

          <div className="inline-flex items-center gap-2 text-sm font-medium text-[#e2493b] transition-all duration-300 group-hover:gap-3" style={{ fontWeight: 500 }}>
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
});

BlogCard.displayName = 'BlogCard';

export default BlogCard;