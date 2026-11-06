import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function PromoBanner() {
  return (
    <section className="py-8 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banner 1 - Products */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-6 md:p-8 min-h-[180px] flex flex-col justify-between group cursor-pointer"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 50%, white 30%, transparent 70%)`,
            }}
          />
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full" />

          <div className="relative z-10">
            <div className="inline-block bg-white/20 text-white text-xs font-body font-semibold px-3 py-1 rounded-full mb-3">
              Limited Time Offer
            </div>
            <h3 className="font-display text-white text-2xl md:text-3xl font-bold leading-tight">
              Up to 40% off<br />
              <span className="font-accent italic font-normal text-amber-100">Traditional Crafts</span>
            </h3>
            <p className="text-white/80 text-sm font-body mt-2">Handpicked artisan products from across Manipur</p>
          </div>

          <Link
            to="/products"
            className="relative z-10 self-start mt-4 inline-flex items-center gap-2 bg-white text-orange-600 font-body font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-all duration-200 group-hover:gap-3"
          >
            Shop Now <FiArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Banner 2 - Services */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 p-6 md:p-8 min-h-[180px] flex flex-col justify-between group cursor-pointer"
        >
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, white 30%, transparent 70%)`,
            }}
          />
          <div className="absolute -left-8 -top-8 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -left-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full" />

          <div className="relative z-10">
            <div className="inline-block bg-white/20 text-white text-xs font-body font-semibold px-3 py-1 rounded-full mb-3">
              Book Instantly
            </div>
            <h3 className="font-display text-white text-2xl md:text-3xl font-bold leading-tight">
              Trusted Local<br />
              <span className="font-accent italic font-normal text-emerald-100">Services Near You</span>
            </h3>
            <p className="text-white/80 text-sm font-body mt-2">Verified professionals across all districts</p>
          </div>

          <Link
            to="/services"
            className="relative z-10 self-start mt-4 inline-flex items-center gap-2 bg-white text-green-600 font-body font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-50 transition-all duration-200 group-hover:gap-3"
          >
            Browse Services <FiArrowRight size={15} />
          </Link>
        </motion.div>
      </div>

      {/* Full-width secondary banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-4 relative overflow-hidden rounded-3xl bg-charcoal p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, white, white 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px'
          }}
        />

        <div className="relative z-10 text-center md:text-left">
          <p className="text-saffron-400 text-xs font-body font-semibold tracking-widest uppercase mb-2">Sell on Manipur Market</p>
          <h3 className="font-display text-white text-xl md:text-2xl font-bold">
            Are you a local artisan or service provider?
          </h3>
          <p className="text-gray-400 text-sm font-body mt-1">Join 500+ sellers already earning through our platform</p>
        </div>

        <button className="relative z-10 flex-shrink-0 px-6 py-3 gradient-saffron text-white font-body font-semibold text-sm rounded-2xl shadow-premium hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5">
          Register as Seller →
        </button>
      </motion.div>
    </section>
  );
}
