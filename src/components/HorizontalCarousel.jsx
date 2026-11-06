import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function HorizontalCarousel({ title, subtitle, children, viewAllLink, viewAllLabel = 'View All' }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  return (
    <section className="py-6 md:py-10">
      {/* Header */}
      <div className="flex items-end justify-between px-4 md:px-6 mb-4">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <p className="text-sm text-gray-500 font-body mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Desktop arrows */}
          <div className="hidden md:flex gap-1.5">
            <button
              onClick={() => scroll(-1)}
              className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:border-saffron-400 hover:text-saffron-600 transition-all duration-200"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:border-saffron-400 hover:text-saffron-600 transition-all duration-200"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="text-sm font-body font-medium text-saffron-600 hover:text-saffron-700 transition-colors"
            >
              {viewAllLabel} →
            </a>
          )}
        </div>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="horizontal-scroll"
        style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        {children}
      </div>
    </section>
  );
}
