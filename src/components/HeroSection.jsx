import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiSearch,
  FiMapPin,
  FiShoppingBag,
  FiTool
} from 'react-icons/fi';

const floatingTags = ['Phanek', 'Black Rice', 'Bamboo Craft', 'Electrician', 'Tutor', 'Salon'];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('products');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const path = tab === 'products' ? '/products' : '/services';
    navigate(query.trim() ? `${path}?search=${encodeURIComponent(query)}` : path);
  };

  return (
    <section className="relative min-h-[92vh] md:min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50" />

        {/* Decorative blobs */}
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-saffron-200/40 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-200/30 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-100/50 rounded-full blur-3xl" />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating product images — desktop only */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-8 top-24 hidden lg:block w-48 h-48 rounded-3xl overflow-hidden shadow-2xl rotate-3 border-4 border-white/80"
      >
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute right-56 top-48 hidden lg:block w-36 h-36 rounded-2xl overflow-hidden shadow-xl -rotate-6 border-4 border-white/80"
      >
        <img
          src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=200&h=200&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute right-16 bottom-32 hidden lg:block w-32 h-32 rounded-2xl overflow-hidden shadow-xl rotate-12 border-4 border-white/80"
      >
        <img
          src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&h=200&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-orange-100 mb-6"
          >
            <FiMapPin size={13} className="text-saffron-500" />

            <span className="text-xs font-body font-medium text-charcoal">
              Serving all districts of Manipur
            </span>

            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-4">
            Discover the{' '}
            <span className="gradient-text font-accent italic">Heart</span>
            <br />
            of Manipur
          </h1>

          <p className="font-body text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Shop authentic local products, book trusted services — all from the comfort of your home.
            Supporting Manipuri artisans and entrepreneurs.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl border border-orange-50 overflow-hidden max-w-xl"
          >
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {['products', 'services'].map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-sm font-body font-medium transition-all duration-200 ${
                    tab === t
                      ? 'text-saffron-600 border-b-2 border-saffron-500 -mb-px bg-orange-50/50'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    {t === 'products' ? (
                      <>
                        <FiShoppingBag size={15} />
                        Products
                      </>
                    ) : (
                      <>
                        <FiTool size={15} />
                        Services
                      </>
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSearch} className="flex items-center px-4 py-3 gap-3">
              <FiSearch size={18} className="text-saffron-400 flex-shrink-0" />

              <input
                type="text"
                placeholder={
                  tab === 'products'
                    ? 'Search products, crafts, rice...'
                    : 'Search electrician, tutor, salon...'
                }
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 text-sm font-body text-charcoal placeholder-gray-400 outline-none bg-transparent"
              />

              <button
                type="submit"
                className="btn-primary text-sm py-2 px-5 whitespace-nowrap"
              >
                Search
              </button>
            </form>
          </motion.div>

          {/* Quick tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-2 mt-5"
          >
            <span className="text-xs text-gray-400 font-body self-center">
              Popular:
            </span>

            {floatingTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setQuery(tag);
                }}
                className="px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-orange-100 text-xs font-body font-medium text-charcoal rounded-xl hover:border-saffron-300 hover:text-saffron-600 transition-all duration-200 shadow-sm"
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-6 mt-10"
          >
            {[
              { value: '500+', label: 'Products' },
              { value: '200+', label: 'Services' },
              { value: '10K+', label: 'Happy Customers' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-xl text-saffron-600">
                  {stat.value}
                </div>

                <div className="text-xs text-gray-500 font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full fill-current text-cream"
        >
          <path d="M0,40 C480,80 960,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}