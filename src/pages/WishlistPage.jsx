import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useStore } from '../hooks/useStore';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-24 md:pb-10 bg-cream flex flex-col items-center justify-center gap-5 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-rose-400"
>
  <FiHeart size={72} fill="currentColor" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-charcoal">Your wishlist is empty</h2>
        <p className="text-gray-500 font-body text-sm text-center max-w-xs">
          Save your favorite Manipuri products here for later
        </p>
        <div className="flex gap-3">
          <Link to="/products" className="btn-primary">Browse Products</Link>
          <Link to="/services" className="px-6 py-3 border-2 border-saffron-500 text-saffron-600 font-body font-medium rounded-2xl hover:bg-saffron-50 transition-all">
            Browse Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-10 bg-cream">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/products" className="flex items-center gap-2 text-sm font-body text-gray-500 hover:text-saffron-600 transition-colors">
            <FiArrowLeft size={16} /> Back
          </Link>
          <h1 className="font-display text-2xl font-bold text-charcoal ml-auto flex items-center gap-2">
            <FiHeart className="text-rose-500" size={22} fill="currentColor" />
            My Wishlist ({wishlist.length})
          </h1>
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {wishlist.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                className="card-premium flex flex-col"
              >
                {/* Image */}
                <Link to={`/products/${item.id}`} className="block relative overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={e => { e.target.src = `https://picsum.photos/seed/${item.id}/300/300`; }}
                    />
                  </div>
                  {item.badge && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 gradient-saffron text-white text-[10px] font-body font-semibold rounded-lg">
                      {item.badge}
                    </span>
                  )}
                </Link>

                {/* Info */}
                <div className="p-3 flex flex-col flex-1 gap-2">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-body font-semibold text-charcoal text-sm leading-snug line-clamp-2 hover:text-saffron-600 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-400 font-body">{item.category}</p>

                  <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="font-display font-bold text-saffron-600 text-base">₹{item.price.toLocaleString()}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 gradient-saffron text-white text-xs font-body font-medium rounded-xl shadow-sm hover:shadow-premium transition-all"
                    >
                      <FiShoppingCart size={13} /> Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="w-9 h-9 flex items-center justify-center bg-rose-50 text-rose-400 rounded-xl hover:bg-rose-100 transition-colors"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
