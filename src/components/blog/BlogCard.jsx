// src/components/blog/BlogCard.jsx
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/blogUtils';

const BlogCard = memo(({ post, index }) => {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: '-100px', amount: 0.15 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-100px', amount: 0.15 }, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } };

  return (
    <Link
      to={`/blog/${post.slug}`}>
      <motion.article
        {...fadeInUp}
        className="group relative p-5 sm:p-6 bg-white border border-[#EFEDE9] rounded-2xl hw-accelerate overflow-hidden cursor-pointer"
        whileHover={{
          y: prefersReducedMotion ? 0 : -6,
          scale: prefersReducedMotion ? 1 : 1.01,
          borderColor: 'rgba(226, 73, 59, 0.3)',
          boxShadow: '0 12px 32px -8px rgba(226, 73, 59, 0.08)',
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
        }}
      >
        <div className="relative z-10">
          <motion.div
            className="inline-flex items-center px-3 sm:px-4 py-1.5 bg-[#e2493b]/10 rounded-full mb-3"
            whileHover={{
              scale: prefersReducedMotion ? 1 : 1.05,
              boxShadow: '0 4px 16px rgba(255, 111, 97, 0.15)',
              transition: { duration: 0.25 }
            }}
          >
            <span className="text-xs font-semibold text-[#e2493b] tracking-wider" style={{ fontWeight: 600 }}>
              {formatDate(post.date)}
            </span>
          </motion.div>

          <h2 className="text-lg sm:text-xl font-medium text-[#1F1F1F] mb-2.5 leading-snug transition-colors duration-400 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
            <Link to={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>

          <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed mb-4 transition-colors duration-400 group-hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
            {post.excerpt}
          </p>

          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#e2493b] transition-all duration-300 group-hover:gap-3"
            style={{ fontWeight: 500 }}
          >
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-[#e2493b] to-transparent pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          whileHover={{ opacity: 0.03, x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e2493b] to-transparent pointer-events-none"
        />
      </motion.article>
    </Link>
  );
});

BlogCard.displayName = 'BlogCard';

export default BlogCard;