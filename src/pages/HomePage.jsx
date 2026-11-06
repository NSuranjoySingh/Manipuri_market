import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiStar,
  FiArrowRight,
  FiMapPin,
  FiTruck,
  FiCheckCircle,
  FiLock,
  FiUsers,
  FiZap
} from 'react-icons/fi';

import HeroSection from '../components/HeroSection';
import { CategorySection } from '../components/CategoryCard';
import HorizontalCarousel from '../components/HorizontalCarousel';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import PromoBanner from '../components/PromoBanner';
import { products, categories } from '../data/products';
import { services, serviceCategories } from '../data/services';

// Card width classes for horizontal scroll
const CARD_W = 'w-[calc(50vw-20px)] md:w-72';
const SERVICE_CARD_W = 'w-[calc(52vw-16px)] md:w-72';

export default function HomePage() {
  const trending = products.slice(0, 8);
  const nearbyServices = services.slice(0, 7);
  const featured = products.filter(p => ['Luxury', 'Premium', 'Bestseller'].includes(p.badge)).slice(0, 4);

  return (
    <>
      <HeroSection />

      {/* Product Categories */}
      <CategorySection
        categories={categories}
        type="product"
        title="Shop by Category"
        subtitle="Explore authentic Manipuri products"
      />

      {/* Trending Products */}
      <div className="bg-white py-2">
        <HorizontalCarousel
          title={
            <span className="flex items-center gap-2">
              Trending Now <FiZap className="text-orange-500" size={18} />
            </span>
          }
          subtitle="Most loved products this week"
          viewAllLink="/products"
          viewAllLabel="See All"
        >
          {trending.map(p => (
            <div key={p.id} className={`scroll-card ${CARD_W}`}>
              <ProductCard product={p} />
            </div>
          ))}
        </HorizontalCarousel>
      </div>

      {/* Promo Banners */}
      <PromoBanner />

      {/* Service Categories */}
      <div className="bg-white py-2">
        <CategorySection
          categories={serviceCategories}
          type="service"
          title="Book a Service"
          subtitle="Trusted professionals near you"
        />
      </div>

      {/* Nearby Services */}
      <HorizontalCarousel
        title={
          <span className="flex items-center gap-2">
            Nearby Services <FiMapPin className="text-red-500" size={18} />
          </span>
        }
        subtitle="Available today in your area"
        viewAllLink="/services"
        viewAllLabel="Browse All"
      >
        {nearbyServices.map(s => (
          <div key={s.id} className={`scroll-card ${SERVICE_CARD_W}`}>
            <ServiceCard service={s} />
          </div>
        ))}
      </HorizontalCarousel>

      {/* Featured Local Products */}
      <section className="py-10 md:py-14 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title flex items-center gap-2"
            >
              Featured Local Products
              <FiStar className="text-yellow-500" size={20} />
            </motion.h2>
            <p className="text-sm text-gray-500 font-body mt-1">Handpicked premium items from Manipur</p>
          </div>

          <Link
            to="/products"
            className="text-sm font-body font-medium text-saffron-600 hover:text-saffron-700 hidden md:flex items-center gap-1"
          >
            View All <FiArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            View All Products
            <FiArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Testimonials strip */}
      <section className="py-8 bg-gradient-to-r from-amber-50 to-orange-50 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Tombi Devi', loc: 'Imphal', text: 'Finally a platform that celebrates Manipuri products! My phanek arrived beautifully packed.', rating: 5 },
              { name: 'Khumukcham Tiken', loc: 'Thoubal', text: 'Booked an electrician through the app — came in 30 minutes. Exceptional service!', rating: 5 },
              { name: 'Laishram Dinabandhu', loc: 'Bishnupur', text: 'The Chak-hao I ordered was 100% authentic. Truly taste of Manipur.', rating: 5 },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-card"
              >
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <FiStar key={j} size={13} className="text-amber-400" fill="currentColor" />
                  ))}
                </div>

                <p className="text-sm font-body text-gray-600 leading-relaxed mb-3 italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 gradient-saffron rounded-full flex items-center justify-center text-white font-display font-bold text-sm">
                    {t.name[0]}
                  </div>

                  <div>
                    <p className="text-xs font-body font-semibold text-charcoal">{t.name}</p>
                    <p className="text-[10px] text-gray-400 font-body">{t.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="py-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <FiTruck size={30} />,
              title: 'Fast Delivery',
              desc: 'Within Manipur in 2-3 days'
            },
            {
              icon: <FiCheckCircle size={30} />,
              title: 'Verified Sellers',
              desc: 'All sellers background-checked'
            },
            {
              icon: <FiLock size={30} />,
              title: 'Secure Payments',
              desc: 'UPI, cards, and COD'
            },
            {
              icon: <FiUsers size={30} />,
              title: 'Support Local',
              desc: 'Every purchase helps artisans'
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-4 md:p-5 shadow-card text-center"
            >
              <div className="flex justify-center mb-3 text-charcoal">
                {f.icon}
              </div>

              <h4 className="font-body font-semibold text-charcoal text-sm mb-1">
                {f.title}
              </h4>

              <p className="text-xs text-gray-500 font-body">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}