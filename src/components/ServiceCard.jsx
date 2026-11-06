import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiStar, FiClock, FiArrowRight } from 'react-icons/fi';

export default function ServiceCard({ service }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="card-premium flex flex-col h-full group"
    >
      {/* Image */}
      <Link to={`/services/${service.id}`} className="relative block overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={e => { e.target.src = `https://picsum.photos/seed/s${service.id}/400/300`; }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badge */}
        {service.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2 py-0.5 gradient-saffron text-white text-[10px] font-body font-semibold rounded-lg shadow-sm">
              {service.badge}
            </span>
          </div>
        )}

        {/* Availability */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1 glass rounded-lg px-2 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-[10px] font-body">{service.availability}</span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <div className="flex items-center gap-1 text-gray-400">
          <FiMapPin size={10} />
          <span className="text-[10px] font-body">{service.location}</span>
        </div>

        <Link to={`/services/${service.id}`}>
          <h3 className="font-body font-semibold text-charcoal text-sm leading-snug line-clamp-2 hover:text-saffron-600 transition-colors">
            {service.title}
          </h3>
        </Link>

        <p className="text-[11px] text-gray-500 font-body line-clamp-1">{service.provider}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={11}
                className={i < Math.floor(service.rating) ? 'text-amber-400' : 'text-gray-200'}
                fill={i < Math.floor(service.rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 font-body">({service.reviews})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-1.5">
          <div>
            <span className="font-display font-bold text-saffron-600 text-base">₹{service.price.toLocaleString()}</span>
            <span className="text-[10px] text-gray-400 font-body ml-1">/{service.priceUnit}</span>
          </div>
          <Link
            to={`/services/${service.id}`}
            className="flex items-center gap-1 px-3 py-1.5 gradient-saffron text-white text-[11px] font-body font-medium rounded-xl shadow-premium hover:shadow-glow transition-all duration-200"
          >
            Book <FiArrowRight size={11} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
