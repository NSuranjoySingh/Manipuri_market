import { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  };

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    showNotification(`${product.title} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        showNotification(`Removed from wishlist`, 'info');
        return prev.filter(i => i.id !== product.id);
      }
      showNotification(`Added to wishlist! ❤️`);
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some(i => i.id === id);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <StoreContext.Provider value={{
      cart, wishlist, notification,
      addToCart, removeFromCart, updateQty,
      toggleWishlist, isWishlisted,
      cartCount, cartTotal
    }}>
      {children}
      {notification && (
        <div className={`fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-white text-sm font-medium shadow-xl transition-all duration-300
          ${notification.type === 'success' ? 'bg-saffron-600' : 'bg-charcoal'}`}>
          {notification.msg}
        </div>
      )}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
