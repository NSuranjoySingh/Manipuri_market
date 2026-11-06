import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiMapPin, FiStar } from 'react-icons/fi';
import { useStore } from '../hooks/useStore';

export default function ProductCard({ product, compact = false }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="card-premium flex flex-col h-full group"
    >
      {/* Image */}
      <Link to={`/products/${product.id}`} className="relative block overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={e => { e.target.src = `https://picsum.photos/seed/${product.id}/400/400`; }}
          />
        </div>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-2 py-0.5 gradient-saffron text-white text-[10px] font-body font-semibold rounded-lg shadow-sm">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-body font-semibold rounded-lg shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); toggleWishlist(product); }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 ${
            wishlisted ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-400 hover:text-rose-500'
          }`}
        >
          <FiHeart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <div className="flex items-center gap-1 text-gray-400">
          <FiMapPin size={10} />
          <span className="text-[10px] font-body">{product.location}</span>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-body font-semibold text-charcoal text-sm leading-snug line-clamp-2 hover:text-saffron-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={11}
                className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'}
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 font-body">({product.reviews})</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto pt-1.5">
          <div>
            <span className="font-display font-bold text-saffron-600 text-base">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through font-body ml-1.5">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="w-8 h-8 gradient-saffron text-white rounded-xl flex items-center justify-center shadow-premium hover:shadow-glow transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <FiShoppingCart size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
