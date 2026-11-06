import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiSearch, FiX, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const sortOptions = [
  { label: 'Popularity', value: 'popular' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating', value: 'rating' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState('popular');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (query) list = list.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
    if (selectedCategory) list = list.filter(p => p.category === selectedCategory);
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, selectedCategory, sort, priceRange]);

  const clearFilters = () => {
    setQuery(''); setSelectedCategory(''); setSort('popular'); setPriceRange([0, 5000]);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-10 bg-cream">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-orange-100 py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-1">All Products</h1>
          <p className="text-gray-500 font-body text-sm">{filtered.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Search + Filter Bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-white rounded-xl text-sm font-body text-charcoal placeholder-gray-400 outline-none border border-gray-100 focus:border-saffron-300 shadow-sm transition-colors"
            />
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body font-medium border shadow-sm transition-all duration-200 ${
              filterOpen || selectedCategory ? 'gradient-saffron text-white border-transparent' : 'bg-white text-charcoal border-gray-100 hover:border-saffron-300'
            }`}
          >
            <FiFilter size={15} />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-3 py-3 bg-white rounded-xl text-sm font-body text-charcoal outline-none border border-gray-100 shadow-sm focus:border-saffron-300 cursor-pointer"
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-body font-semibold text-charcoal text-sm">Filter by Category</h3>
                  <button onClick={clearFilters} className="text-xs text-saffron-600 font-body hover:underline flex items-center gap-1">
                    <FiX size={12} /> Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-body font-medium transition-all ${
                      !selectedCategory ? 'gradient-saffron text-white' : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-saffron-600'
                    }`}
                  >
                    All
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name === selectedCategory ? '' : cat.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-body font-medium transition-all flex items-center gap-1 ${
                        selectedCategory === cat.name ? 'gradient-saffron text-white' : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-saffron-600'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-xs font-body font-semibold text-charcoal mb-2">
                    Price: ₹{priceRange[0]} — ₹{priceRange[1]}
                  </p>
                  <input
                    type="range"
                    min={0} max={5000} step={100}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-orange-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filters */}
        {(selectedCategory || query) && (
          <div className="flex flex-wrap gap-2 mb-5">
            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-saffron-100 text-saffron-700 text-xs font-body font-medium rounded-xl">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('')}><FiX size={11} /></button>
              </span>
            )}
            {query && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-saffron-100 text-saffron-700 text-xs font-body font-medium rounded-xl">
                "{query}"
                <button onClick={() => setQuery('')}><FiX size={11} /></button>
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-bold text-charcoal mb-2">No products found</h3>
            <p className="text-gray-500 font-body text-sm mb-6">Try a different search or filter</p>
            <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
