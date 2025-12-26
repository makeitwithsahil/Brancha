import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye, X } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { 
    duration: 0.8, 
    ease: [0.16, 1, 0.3, 1] 
  }
};

const staggerContainer = {
  whileInView: { 
    transition: { 
      staggerChildren: 0.12,
      delayChildren: 0.1 
    } 
  },
  viewport: { once: true, margin: '-50px' }
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Website', 'Designs', 'Shoot'];

  const projects = [
    {
      id: 4,
      title: 'Modern Brand Identity',
      category: 'Designs',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      description: 'Complete brand identity system including logo design, color palette, typography guidelines, and brand collateral. Created to establish a strong, memorable presence in the tech industry.',
      client: 'InnovateTech',
      year: '2025',
      services: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines'],
      results: '95% brand recognition in target market',
      websiteUrl: null
    },
    {
      id: 5,
      title: 'Minimalist UI Kit',
      category: 'Designs',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
      description: 'A comprehensive design system featuring 200+ components, consistent design tokens, and accessibility-first approach. Built for scalability across multiple platforms.',
      client: 'DesignCo Studio',
      year: '2025',
      services: ['Design System', 'Component Library', 'Documentation', 'Prototyping'],
      results: 'Adopted by 50+ designers, 30% faster design time',
      websiteUrl: null
    },
    {
      id: 7,
      title: 'Urban Architecture Series',
      category: 'Shoot',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      description: 'Professional architectural photography showcasing modern urban developments. Captured during golden hour with emphasis on geometric patterns and natural lighting.',
      client: 'Urban Developers Group',
      year: '2025',
      services: ['Architectural Photography', 'Post-Processing', 'HDR Imaging', 'Drone Shots'],
      results: 'Featured in 3 architecture magazines',
      websiteUrl: null
    },
    {
      id: 8,
      title: 'Product Launch Campaign',
      category: 'Shoot',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
      description: 'High-end product photography for tech gadget launch. Studio shots with creative lighting setups and detailed macro photography highlighting premium quality.',
      client: 'TechGear Pro',
      year: '2025',
      services: ['Product Photography', 'Studio Setup', 'Retouching', 'Creative Direction'],
      results: '2M+ social media impressions, 15% sales increase',
      websiteUrl: null
    },
    {
      id: 9,
      title: 'Fashion Editorial Shoot',
      category: 'Shoot',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop',
      description: 'Editorial fashion photography featuring seasonal collection. On-location shoot with professional models, styling, and makeup team. Delivered print-ready images.',
      client: 'Vogue Fashion',
      year: '2025',
      services: ['Fashion Photography', 'Art Direction', 'Location Scouting', 'Team Coordination'],
      results: 'Published in major fashion magazine, 500K+ engagement',
      websiteUrl: null
    }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="bg-white overflow-hidden font-serif">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-28">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-gradient-to-br from-[#FF6B6B]/5 via-[#FF8E8E]/3 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-[#FF6B6B]/4 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <motion.div
              className="inline-block mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-[0.2em] text-neutral-500 uppercase">
                Our Work
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-neutral-900 mb-4 sm:mb-6 tracking-tight leading-[1.05] px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              Projects that <span className="italic font-normal">matter</span>
            </motion.h1>

            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              A collection of websites, brand systems, and photography that reflect our commitment to quality and our clients' success.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 border-y border-neutral-100 bg-neutral-50/50 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  relative px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-sans font-medium tracking-wide rounded-full
                  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${activeCategory === category
                    ? 'text-white bg-[#FF6B6B] shadow-lg shadow-[#FF6B6B]/20 scale-105'
                    : 'text-neutral-700 bg-white border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 active:scale-95'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  layout
                  className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm shadow-neutral-200/50 hover:shadow-xl hover:shadow-neutral-300/50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-sans font-semibold tracking-wide text-white bg-neutral-900/80 backdrop-blur-sm rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Overlay Buttons - Desktop Only */}
                    <div className="hidden md:flex absolute inset-0 items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="p-3 sm:p-3.5 bg-white/95 backdrop-blur-sm rounded-full shadow-xl text-neutral-900 hover:bg-white hover:scale-110 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                        style={{ transitionDelay: '50ms' }}
                        aria-label="View project details"
                      >
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      {project.websiteUrl && (
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 sm:p-3.5 bg-[#FF6B6B] backdrop-blur-sm rounded-full shadow-xl text-white hover:bg-[#FF5555] hover:scale-110 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                          style={{ transitionDelay: '100ms' }}
                          aria-label="Visit website"
                        >
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-neutral-900 group-hover:text-[#FF6B6B] transition-colors duration-300 leading-tight pr-2">
                        {project.title}
                      </h3>
                      {project.websiteUrl && (
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 flex-shrink-0 mt-1" />
                      )}
                    </div>
                    
                    <p className="text-xs sm:text-sm font-sans text-neutral-600 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-neutral-100">
                      <span className="text-[10px] sm:text-xs font-sans font-medium text-neutral-500 truncate mr-2">
                        {project.client}
                      </span>
                      <span className="text-[10px] sm:text-xs font-sans font-medium text-neutral-400 flex-shrink-0">
                        {project.year}
                      </span>
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="flex gap-2 mt-3 sm:mt-4 md:hidden">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-sans font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-all duration-300 active:scale-95"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                      {project.websiteUrl && (
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-sans font-medium text-[#FF6B6B] bg-[#FF6B6B]/5 rounded-lg hover:bg-[#FF6B6B]/10 border border-[#FF6B6B]/10 transition-all duration-300 active:scale-95"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Visit
                        </a>
                      )}
                    </div>

                    {/* Desktop Visit Button */}
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center justify-center gap-2 w-full mt-4 py-2.5 text-sm font-sans font-medium text-[#FF6B6B] bg-[#FF6B6B]/5 rounded-lg hover:bg-[#FF6B6B]/10 border border-[#FF6B6B]/10 hover:border-[#FF6B6B]/20 transition-all duration-300"
                      >
                        Visit Website
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 sm:py-20"
            >
              <p className="text-base sm:text-lg text-neutral-500">No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto m-0 sm:m-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="sticky sm:absolute top-4 right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-full shadow-xl text-neutral-600 hover:text-neutral-900 hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Project Image */}
              <div className="aspect-video sm:aspect-[21/10] bg-neutral-900 relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
                
                {/* Category Badge on Image */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-sans font-semibold tracking-wide text-white bg-neutral-900/80 backdrop-blur-sm rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16">
                {/* Meta Information */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-neutral-200">
                  <div>
                    <div className="text-[10px] sm:text-xs font-sans font-semibold tracking-wider text-neutral-500 uppercase mb-1 sm:mb-2">Client</div>
                    <div className="text-xs sm:text-sm md:text-base font-medium text-neutral-900 truncate">{selectedProject.client}</div>
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs font-sans font-semibold tracking-wider text-neutral-500 uppercase mb-1 sm:mb-2">Year</div>
                    <div className="text-xs sm:text-sm md:text-base font-medium text-neutral-900">{selectedProject.year}</div>
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs font-sans font-semibold tracking-wider text-neutral-500 uppercase mb-1 sm:mb-2">Category</div>
                    <div className="text-xs sm:text-sm md:text-base font-medium text-neutral-900">{selectedProject.category}</div>
                  </div>
                </div>

                {/* Project Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 mb-4 sm:mb-6 tracking-tight leading-tight">
                  {selectedProject.title}
                </h2>
                
                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed mb-6 sm:mb-8">
                  {selectedProject.description}
                </p>

                {/* Services */}
                <div className="mb-6 sm:mb-8 md:mb-10">
                  <div className="text-[10px] sm:text-xs font-sans font-semibold tracking-wider text-neutral-500 uppercase mb-3 sm:mb-4">Services Provided</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map((service, i) => (
                      <span 
                        key={i}
                        className="text-xs sm:text-sm font-sans text-neutral-700 px-3 sm:px-4 py-1.5 sm:py-2 bg-neutral-100 rounded-lg border border-neutral-200"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technologies (if website) */}
                {selectedProject.technologies && (
                  <div className="mb-6 sm:mb-8 md:mb-10">
                    <div className="text-[10px] sm:text-xs font-sans font-semibold tracking-wider text-neutral-500 uppercase mb-3 sm:mb-4">Technologies Used</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="text-xs sm:text-sm font-sans text-neutral-700 px-3 sm:px-4 py-1.5 sm:py-2 bg-neutral-100 rounded-lg border border-neutral-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                <div className="mb-6 sm:mb-8 md:mb-10 p-4 sm:p-5 md:p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="text-[10px] sm:text-xs font-sans font-semibold tracking-wider text-neutral-500 uppercase mb-2 sm:mb-3">Key Results</div>
                  <div className="text-base sm:text-lg md:text-xl font-medium text-neutral-900">{selectedProject.results}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {selectedProject.websiteUrl && (
                    <a
                      href={selectedProject.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-sans font-medium tracking-wide text-white bg-[#FF6B6B] rounded-full shadow-lg shadow-[#FF6B6B]/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-xl hover:shadow-[#FF6B6B]/30 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button 
                    onClick={() => window.location.href = '/contact'}
                    className="px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border border-neutral-300 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-neutral-400 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Discuss Your Project
                  </button>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="sm:hidden px-6 py-3 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border border-neutral-300 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-neutral-400 hover:bg-neutral-50 active:scale-[0.98]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonial Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-900 text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            {...fadeInUp}
          >
            <div className="mb-6 sm:mb-8">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-white/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed mb-6 sm:mb-8 text-white/90 px-4">
              The process was smooth and communication was clear throughout. The final website looks clean, professional, and works well for our business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1000px] md:w-[1200px] h-[800px] sm:h-[1000px] md:h-[1200px] bg-gradient-to-br from-[#FF6B6B]/8 via-[#FF8E8E]/4 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            {...fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-neutral-900 mb-4 sm:mb-6 tracking-tight leading-[1.1] px-4">
              Ready to Create <span className="italic font-normal">Impact</span>?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-600 mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto px-4">
              Let's discuss how strategic design and development can drive measurable results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="group px-8 sm:px-10 py-3 sm:py-3.5 md:py-4 text-sm font-sans font-medium tracking-wide text-white bg-[#FF6B6B] rounded-full shadow-xl shadow-[#FF6B6B]/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-[#FF6B6B]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Schedule a Consultation
              </button>
              <button 
                onClick={() => window.location.href = '/services'}
                className="group px-8 sm:px-10 py-3 sm:py-3.5 md:py-4 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border border-neutral-300 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-neutral-400 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}