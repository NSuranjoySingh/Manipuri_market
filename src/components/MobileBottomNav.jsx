import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiTool, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useStore } from '../hooks/useStore';

export default function MobileBottomNav() {
  const location = useLocation();
  const { cartCount, wishlist } = useStore();

  const tabs = [
    { to: '/', icon: FiHome, label: 'Home' },
    { to: '/products', icon: FiGrid, label: 'Products' },
    { to: '/services', icon: FiTool, label: 'Services' },
    { to: '/wishlist', icon: FiHeart, label: 'Wishlist', badge: wishlist.length },
    { to: '/cart', icon: FiShoppingCart, label: 'Cart', badge: cartCount },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 pb-safe">
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ to, icon: Icon, label, badge }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center justify-center flex-1 h-full relative gap-0.5"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={`transition-colors duration-200 ${active ? 'text-saffron-600' : 'text-gray-400'}`}
                />
                {badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 gradient-saffron text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-body font-medium transition-colors duration-200 ${
                active ? 'text-saffron-600' : 'text-gray-400'
              }`}>
                {label}
              </span>
              {active && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 gradient-saffron rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
