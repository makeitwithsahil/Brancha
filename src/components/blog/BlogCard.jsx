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
    <motion.article 
      {...fadeInUp}
      className="group relative p-6 sm:p-7 md:p-8 bg-white border border-[#EFEDE9] rounded-2xl hw-accelerate overflow-hidden cursor-pointer"
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
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e2493b]/5 border border-[#e2493b]/10 mb-4 relative overflow-hidden group cursor-default"
          whileHover={{ 
            scale: prefersReducedMotion ? 1 : 1.03,
            boxShadow: '0 0 20px rgba(255, 111, 97, 0.15)',
            transition: { duration: 0.25 }
          }}
        >
          <span className="text-xs font-medium text-[#e2493b] italic relative z-10" style={{ letterSpacing: '0.01em', fontWeight: 500 }}>
            {formatDate(post.date)}
          </span>
          
          {!prefersReducedMotion && (
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e2493b]/10 to-transparent"
              style={{ pointerEvents: 'none' }}
            />
          )}
        </motion.div>
        
        <h2 className="text-xl sm:text-2xl font-medium text-[#1F1F1F] mb-3 leading-snug transition-colors duration-400 group-hover:text-[#e2493b]" style={{ letterSpacing: '-0.01em', fontWeight: 500 }}>
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        
        <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed mb-6 transition-colors duration-400 group-hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
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
  );
});

BlogCard.displayName = 'BlogCard';

export default BlogCard;