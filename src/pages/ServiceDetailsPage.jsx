import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiStar, FiMapPin, FiClock, FiCheck, FiPhone, FiMessageCircle } from 'react-icons/fi';
import { services } from '../data/services';
import ServiceCard from '../components/ServiceCard';

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === Number(id));
  const [booked, setBooked] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  if (!service) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">😕</div>
        <h2 className="font-display text-2xl font-bold text-charcoal">Service not found</h2>
        <Link to="/services" className="btn-primary">Back to Services</Link>
      </div>
    );
  }

  const related = services.filter(s => s.category === service.category && s.id !== service.id).slice(0, 4);

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => setBooked(false), 3000);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-10 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-body text-gray-500 hover:text-saffron-600 transition-colors mb-6">
          <FiArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-card">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = `https://picsum.photos/seed/s${service.id}/600/450`; }}
              />
            </div>

            {/* Provider card */}
            <div className="mt-4 bg-white rounded-2xl p-4 shadow-card flex items-center gap-4">
              <div className="w-14 h-14 gradient-saffron rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl">
                {service.provider[0]}
              </div>
              <div className="flex-1">
                <p className="font-body font-semibold text-charcoal">{service.provider}</p>
                <p className="text-xs text-gray-400 font-body">{service.experience || 'Professional'}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center hover:bg-green-100 transition-colors">
                  <FiPhone size={16} />
                </button>
                <button className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-colors">
                  <FiMessageCircle size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-body font-medium rounded-xl">
                {service.category}
              </span>
              <div className="flex items-center gap-1 text-gray-400">
                <FiMapPin size={13} />
                <span className="text-xs font-body">{service.location}</span>
              </div>
            </div>

            <h1 className="font-display text-2xl md:text-3xl font-bold text-charcoal leading-tight">
              {service.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={16} className={i < Math.floor(service.rating) ? 'text-amber-400' : 'text-gray-200'} fill={i < Math.floor(service.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="font-body font-semibold text-charcoal text-sm">{service.rating}</span>
              <span className="text-gray-400 text-sm font-body">({service.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-3xl text-saffron-600">₹{service.price.toLocaleString()}</span>
              <span className="font-body text-gray-400 text-sm">/{service.priceUnit}</span>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 bg-green-50 rounded-2xl px-4 py-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div>
                <p className="text-xs text-gray-400 font-body">Availability</p>
                <p className="text-sm font-body font-semibold text-green-700">{service.availability}</p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-gray-400">
                <FiClock size={13} />
                <span className="text-xs font-body">Quick response</span>
              </div>
            </div>

            {/* Services Offered */}
            {service.services_offered && (
              <div>
                <p className="text-sm font-body font-semibold text-charcoal mb-3">Services Included</p>
                <div className="grid grid-cols-2 gap-2">
                  {service.services_offered.map(s => (
                    <div key={s} className="flex items-center gap-2 text-sm font-body text-gray-600">
                      <div className="w-5 h-5 gradient-saffron rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiCheck size={11} className="text-white" />
                      </div>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities (PG) */}
            {service.amenities && (
              <div>
                <p className="text-sm font-body font-semibold text-charcoal mb-3">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {service.amenities.map(a => (
                    <span key={a} className="px-3 py-1.5 bg-orange-50 text-saffron-700 text-xs font-body rounded-xl flex items-center gap-1">
                      <FiCheck size={11} /> {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Vehicles (Rental) */}
            {(service.bikes_available || service.vehicles) && (
              <div>
                <p className="text-sm font-body font-semibold text-charcoal mb-3">Available Vehicles</p>
                <div className="flex flex-wrap gap-2">
                  {(service.bikes_available || service.vehicles).map(v => (
                    <span key={v} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-body rounded-xl">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Book Button */}
            <button
              onClick={handleBook}
              className={`w-full py-4 rounded-2xl font-body font-semibold text-base transition-all duration-300 shadow-premium mt-2 ${
                booked
                  ? 'bg-green-500 text-white shadow-none'
                  : 'gradient-saffron text-white hover:shadow-glow hover:-translate-y-0.5'
              }`}
            >
              {booked ? '✅ Booking Confirmed!' : `Book Now — ₹${service.price.toLocaleString()}/${service.priceUnit}`}
            </button>

            <p className="text-xs text-gray-400 font-body text-center">No advance payment required • Cancel anytime</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex border-b border-gray-200 mb-6">
            {['about', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-body font-medium capitalize transition-all ${
                  activeTab === tab ? 'text-saffron-600 border-b-2 border-saffron-500' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${service.reviews})` : 'About'}
              </button>
            ))}
          </div>

          {activeTab === 'about' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <p className="font-body text-gray-600 leading-relaxed text-sm">{service.description}</p>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-2xl">
              {service.reviews_list?.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-card">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 gradient-forest rounded-full flex items-center justify-center text-white font-display font-bold text-sm">
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
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="section-title mb-6">Similar Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(s => <ServiceCard key={s.id} service={s} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
