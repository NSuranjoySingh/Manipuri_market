import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function CategoryCard({ category, type = 'product', index = 0 }) {
  const to = type === 'product' ? `/products?category=${encodeURIComponent(category.name)}` : `/services?category=${encodeURIComponent(category.name)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
    >
      <Link to={to} className="group block">
        <div className="flex flex-col items-center gap-3">
          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl md:text-3xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
            <category.icon size={28} strokeWidth={2.2} />
          </div>
          <div className="text-center">
            <p className="text-xs md:text-sm font-body font-semibold text-charcoal group-hover:text-saffron-600 transition-colors leading-tight text-center">
              {category.name}
            </p>
            <p className="text-[10px] text-gray-400 font-body mt-0.5">{category.count}+</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategorySection({ categories, type = 'product', title, subtitle }) {
  return (
    <section className="py-10 md:py-14 max-w-7xl mx-auto px-4 md:px-6">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm font-body mt-2"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Mobile: horizontal scroll | Desktop: grid */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat, i) => (
          <CategoryCard key={cat.id} category={cat} type={type} index={i} />
        ))}
      </div>

      <div
        className="md:hidden flex gap-5 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        {categories.map((cat, i) => (
          <div key={cat.id} className="flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
            <CategoryCard category={cat} type={type} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
