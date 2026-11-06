import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft, FiTag } from 'react-icons/fi';
import { useStore } from '../hooks/useStore';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, addToCart } = useStore();

  const deliveryFee = cartTotal >= 500 ? 0 : 60;
  const total = cartTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-24 md:pb-10 bg-cream flex flex-col items-center justify-center gap-5 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-7xl"
        >
          🛒
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-charcoal">Your cart is empty</h2>
        <p className="text-gray-500 font-body text-sm text-center max-w-xs">
          Add some amazing Manipuri products and services to your cart
        </p>
        <Link to="/products" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-10 bg-cream">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/products" className="flex items-center gap-2 text-sm font-body text-gray-500 hover:text-saffron-600 transition-colors">
            <FiArrowLeft size={16} /> Continue Shopping
          </Link>
          <h1 className="font-display text-2xl font-bold text-charcoal ml-auto">My Cart ({cart.length})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {cart.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="bg-white rounded-2xl p-4 shadow-card flex gap-4"
                >
                  {/* Image */}
                  <Link to={`/products/${item.id}`} className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.src = `https://picsum.photos/seed/${item.id}/80/80`; }}
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.id}`}>
                      <h3 className="font-body font-semibold text-charcoal text-sm leading-snug hover:text-saffron-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-400 font-body mt-0.5">{item.category}</p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty controls */}
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <FiMinus size={13} />
                        </button>
                        <span className="w-8 text-center text-sm font-body font-semibold text-charcoal">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <FiPlus size={13} />
                        </button>
                      </div>

                      {/* Price + Remove */}
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-saffron-600 text-base">
                          ₹{(item.price * item.qty).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 text-gray-300 hover:text-rose-400 flex items-center justify-center rounded-xl hover:bg-rose-50 transition-all"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-5 shadow-card sticky top-24">
              <h2 className="font-display font-bold text-lg text-charcoal mb-5">Order Summary</h2>

              {/* Coupon */}
              <div className="flex gap-2 mb-5">
                <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
                  <FiTag size={14} className="text-gray-400" />
                  <input type="text" placeholder="Enter coupon code" className="flex-1 text-xs font-body text-charcoal placeholder-gray-400 outline-none" />
                </div>
                <button className="px-3 py-2 bg-orange-50 text-saffron-600 text-xs font-body font-semibold rounded-xl hover:bg-saffron-100 transition-colors">
                  Apply
                </button>
              </div>

              {/* Breakdowns */}
              <div className="space-y-3 mb-5">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-xs font-body text-gray-500">
                    <span className="truncate max-w-[160px]">{item.title} × {item.qty}</span>
                    <span>₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-dashed border-gray-200 pt-3 space-y-2.5">
                  <div className="flex items-center justify-between text-sm font-body text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-body">
                    <span className="text-gray-600">Delivery</span>
                    <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : 'text-gray-600'}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-gray-400 font-body">Add ₹{500 - cartTotal} more for free delivery</p>
                  )}
                </div>
                <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                  <span className="font-body font-bold text-charcoal">Total</span>
                  <span className="font-display font-bold text-xl text-saffron-600">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full btn-primary flex items-center justify-center gap-2 text-base py-4">
                <FiShoppingBag size={18} />
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-4">
                {['UPI', 'Cards', 'COD'].map(m => (
                  <span key={m} className="text-[10px] font-body text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">{m}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
