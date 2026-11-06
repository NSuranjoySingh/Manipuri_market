import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiArrowLeft, FiStar, FiMapPin, FiPackage, FiShield, FiTruck } from 'react-icons/fi';
import { products } from '../data/products';
import { useStore } from '../hooks/useStore';
import ProductCard from '../components/ProductCard';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">😕</div>
        <h2 className="font-display text-2xl font-bold text-charcoal">Product not found</h2>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-10 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-body text-gray-500 hover:text-saffron-600 transition-colors mb-6"
        >
          <FiArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-card">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = `https://picsum.photos/seed/${product.id}/600/600`; }}
              />
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className="px-3 py-1 gradient-saffron text-white text-xs font-body font-semibold rounded-xl shadow-md">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-body font-semibold rounded-xl shadow-md">
                  {discount}% OFF
                </span>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Category + Location */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-orange-100 text-saffron-700 text-xs font-body font-medium rounded-xl">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-gray-400">
                <FiMapPin size={13} />
                <span className="text-xs font-body">{product.location}</span>
              </div>
            </div>

            <h1 className="font-display text-2xl md:text-3xl font-bold text-charcoal leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="font-body font-semibold text-charcoal text-sm">{product.rating}</span>
              <span className="text-gray-400 text-sm font-body">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display font-bold text-3xl text-saffron-600">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="font-body text-gray-400 line-through text-lg">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-green-600 font-body font-semibold text-sm bg-green-50 px-2 py-0.5 rounded-lg">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Seller */}
            <div className="bg-orange-50 rounded-2xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-body">Sold by</p>
                <p className="text-sm font-body font-semibold text-charcoal">{product.seller}</p>
              </div>
              <span className="text-xs text-green-600 font-body font-medium bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                <FiShield size={11} /> Verified
              </span>
            </div>

            {/* Sizes */}
            {product.sizes && (
              <div>
                <p className="text-sm font-body font-semibold text-charcoal mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-xl text-sm font-body font-medium border-2 transition-all ${
                        selectedSize === size
                          ? 'border-saffron-500 bg-saffron-50 text-saffron-700'
                          : 'border-gray-200 text-gray-600 hover:border-saffron-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && (
              <div>
                <p className="text-sm font-body font-semibold text-charcoal mb-2">Color</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <span key={color} className="px-3 py-1.5 border border-gray-200 rounded-xl text-xs font-body text-gray-600 bg-white">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="flex items-center gap-4">
              <p className="text-sm font-body font-semibold text-charcoal">Quantity</p>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 text-gray-600 hover:bg-gray-50 font-body text-lg flex items-center justify-center transition-colors">-</button>
                <span className="w-12 text-center font-body font-semibold text-charcoal text-sm">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 text-gray-600 hover:bg-gray-50 font-body text-lg flex items-center justify-center transition-colors">+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <FiShoppingCart size={16} />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-200 ${
                  wishlisted
                    ? 'border-rose-400 bg-rose-50 text-rose-500'
                    : 'border-gray-200 text-gray-400 hover:border-rose-300 hover:text-rose-400'
                }`}
              >
                <FiHeart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Delivery info */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: FiTruck, text: 'Free delivery above ₹500' },
                { icon: FiPackage, text: '3-5 days delivery' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-500">
                  <Icon size={14} />
                  <span className="text-xs font-body">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            {['description', 'reviews', 'tags'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-body font-medium capitalize whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'text-saffron-600 border-b-2 border-saffron-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${product.reviews})` : tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <p className="font-body text-gray-600 leading-relaxed text-sm">{product.description}</p>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-2xl">
              {product.reviews_list?.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-card">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 gradient-saffron rounded-full flex items-center justify-center text-white font-display font-bold text-sm">
                        {r.name[0]}
                      </div>
                      <div>
                        <p className="font-body font-semibold text-charcoal text-sm">{r.name}</p>
                        <p className="text-[11px] text-gray-400 font-body">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(r.rating)].map((_, j) => (
                        <FiStar key={j} size={12} className="text-amber-400" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-body text-gray-600">{r.comment}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'tags' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-2">
              {product.tags?.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-orange-50 text-saffron-700 text-xs font-body font-medium rounded-xl">
                  #{tag}
                </span>
              ))}
            </motion.div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="section-title mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
