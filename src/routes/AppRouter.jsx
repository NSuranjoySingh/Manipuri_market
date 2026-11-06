import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from '../hooks/useStore';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import ServicesPage from '../pages/ServicesPage';
import ServiceDetailsPage from '../pages/ServiceDetailsPage';
import CartPage from '../pages/CartPage';
import WishlistPage from '../pages/WishlistPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </MainLayout>
      </StoreProvider>
    </BrowserRouter>
  );
}
