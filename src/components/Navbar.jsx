import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiHeart, FiMenu, FiX, FiMapPin } from 'react-icons/fi';
import { useStore } from '../hooks/useStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, wishlist } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Services', to: '/services' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-orange-50' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 gradient-saffron rounded-xl flex items-center justify-center shadow-premium group-hover:shadow-glow transition-all duration-300">
                <span className="text-white font-display font-bold text-base">M</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg text-charcoal">Manipur</span>
                <span className="text-xs font-body text-saffron-500 -mt-0.5 tracking-widest uppercase">Market</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-body font-medium text-sm transition-colors duration-200 relative group ${
                    location.pathname === link.to ? 'text-saffron-600' : 'text-charcoal hover:text-saffron-600'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-saffron-500 transition-all duration-300 ${
                    location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl hover:bg-orange-50 text-charcoal hover:text-saffron-600 transition-all duration-200"
              >
                <FiSearch size={20} />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 rounded-xl hover:bg-orange-50 text-charcoal hover:text-saffron-600 transition-all duration-200">
                <FiHeart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 rounded-xl hover:bg-orange-50 text-charcoal hover:text-saffron-600 transition-all duration-200">
                <FiShoppingCart size={20} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 gradient-saffron text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-orange-50 text-charcoal transition-all duration-200 ml-1"
              >
                {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-orange-50 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3 rounded-xl font-body font-medium text-sm transition-colors ${
                      location.pathname === link.to
                        ? 'bg-orange-50 text-saffron-600'
                        : 'text-charcoal hover:bg-orange-50 hover:text-saffron-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 flex items-center gap-2 px-4 py-2 text-xs text-gray-400">
                  <FiMapPin size={12} />
                  <span>Delivering across Manipur</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="flex items-center px-5 py-4 gap-3">
                <FiSearch size={20} className="text-saffron-500 flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products, services, crafts..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 font-body text-base text-charcoal placeholder-gray-400 outline-none"
                />
                <button type="submit" className="btn-primary text-sm py-2 px-4">Search</button>
              </form>
              <div className="px-5 pb-4">
                <p className="text-xs text-gray-400 font-body mb-2">Popular searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Phanek', 'Black Rice', 'Bamboo Craft', 'Electrician', 'Tutor'].map(t => (
                    <button
                      key={t}
                      onClick={() => { setSearchQuery(t); }}
                      className="px-3 py-1 bg-orange-50 text-saffron-600 text-xs font-body rounded-lg hover:bg-saffron-100 transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
