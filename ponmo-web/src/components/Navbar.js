import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon, 
  ShoppingCartIcon,
  UserIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { cart } = useCart();
  const { currentUser, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      setIsMobileDropdownOpen(false);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to log out');
    }
  };

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Shop Now', path: '/shop' },
    { name: 'Charity', path: '/charity' },
    // { name: 'Blog', path: '/blog' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-[#0E2A47] shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-green-500">
             <img alt='logo' src='/BiteBack.png' width={[90]} /> 
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white hover:text-green-500 transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-white hover:text-green-500 " />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-white hover:text-green-500 "
                >
                  <UserIcon className="h-6 w-6" />
                  <span>{currentUser.displayName || 'User'}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white z-50 border border-gray-200">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-white hover:text-green-500">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0E2A47] shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 text-white bg-green-500 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!currentUser && (
              <Link
                to="/login"
                className="block px-3 py-2 text-white hover:text-green-500 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Mobile User Dropdown */}
      {isMobileDropdownOpen && currentUser && (
        <div className="md:hidden border-t border-gray-200 bg-[#0E2A47]">
          <div className="py-2 space-y-1">
            <div className="px-4 py-2 text-sm text-white">
              Hello, {currentUser.displayName || 'User'}
            </div>
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-white hover:bg-green-500"
              onClick={() => {
                setIsMobileDropdownOpen(false);
                setIsOpen(false);
              }}
            >
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-green-500"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
