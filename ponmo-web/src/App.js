import { BrowserRouter as Router, Routes, Route, useLocation, } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Charity from './pages/Charity';
import Cart from './components/Cart';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import Checkout from './pages/Checkout';
import { OrderProvider } from './context/OrderContext';
import TrackOrder from './pages/TrackOrder';
import ProtectedRoute from './components/ProtectedRoute';
import ContactForm from './pages/Contact';
import AboutUs from './pages/About';
import FloatingButtons from './components/FloatinButton';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function Layout() {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/register', '/cart','/product/:id', '/checkout', '/track-order', '/profile'];

  return (
    <div className="min-h-screen flex flex-col">
       <ScrollToTop/>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
          <Route path="/charity" element={<Charity />} />
          {/* <Route path="/blog" element={<Blog />} />*/}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactForm />} />  

          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/track/:orderId" element={<TrackOrder />} />
        </Routes>
      </main>

      {/* Floating Buttons */}
      <FloatingButtons />
      
      {/* Hide Footer on login & register pages */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <Router>
            <Layout />
          </Router>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
