import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white mt-20 mb-16 md:mb-0">
      {/* Top wave */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full text-cream fill-current">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 gradient-saffron rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-base">M</span>
              </div>
              <div>
                <div className="font-display font-bold text-lg">Manipur Market</div>
                <div className="text-xs text-saffron-400 tracking-widest uppercase">Your Local Platform</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm font-body leading-relaxed mb-4">
              Connecting the soul of Manipur — its artisans, service providers, and communities — with the world.
            </p>
            <div className="flex gap-3">
              {[FiInstagram, FiFacebook, FiTwitter, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-saffron-600 transition-colors duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-white">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'All Products', to: '/products' },
                { label: 'All Services', to: '/services' },
                { label: 'My Wishlist', to: '/wishlist' },
                { label: 'My Cart', to: '/cart' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-400 text-sm font-body hover:text-saffron-400 transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-white">Categories</h4>
            <ul className="space-y-2.5">
              {['Traditional Clothes', 'Black Rice', 'Bamboo Crafts', 'Handmade Items', 'Electronics'].map(c => (
                <li key={c}>
                  <Link to="/products" className="text-gray-400 text-sm font-body hover:text-saffron-400 transition-colors duration-200">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-gray-400 text-sm font-body">
                <FiMapPin size={14} className="mt-0.5 flex-shrink-0 text-saffron-400" />
                Paona Bazaar, Imphal West, Manipur - 795001
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm font-body">
                <FiPhone size={14} className="flex-shrink-0 text-saffron-400" />
                +91 98000 00000
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm font-body">
                <FiMail size={14} className="flex-shrink-0 text-saffron-400" />
                hello@manipurmarket.in
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs font-body text-center">
            © 2026 Manipur Market. 
          </p>
          <div className="flex items-center gap-1">

            
          </div>
        </div>
      </div>
    </footer>
  );
}
