import React from "react";
import { Mail, Facebook, Twitter, Instagram, Link, Phone, Info } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-12 px-4">
    {/* Container */}
    <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-20">
      {/* Newsletter Box */}
      <div className="bg-green-950 text-center p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Subscribe to <span className="text-green-400">Newsletter</span>
        </h2>
        <p className="text-gray-300 mt-2 text-sm md:text-base">
          Stay updated with our latest offers and news.
        </p>

        {/* Input & Button */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center">
          <input
            type="email"
            placeholder="Enter your email..."
            className="p-3 w-full sm:w-80 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none text-black focus:outline-none"
          />
          <button className="bg-green-500 px-6 py-3 w-full sm:w-auto rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none text-white font-bold flex items-center justify-center">
            <Mail className="w-5 h-5 mr-2" /> Subscribe
          </button>
        </div>
      </div>
    </div>
  
      {/* Footer Section */}
      <div className="max-w-6xl mx-auto mt-4 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        {/* About Us */}
        <div className="bg-gray-800 p-6 rounded-lg text-center md:text-left">
          <h3 className="text-green-400 text-xl font-semibold">Musty<span className="text-white">Dev</span></h3>
          <p className="mt-4 text-gray-400">
            “Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.”
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <Facebook className="w-6 h-6 cursor-pointer" />
            <Twitter className="w-6 h-6 cursor-pointer" />
            <Instagram className="w-6 h-6 cursor-pointer" />
          </div>
        </div>

        {/* Useful Links */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-white text-xl font-semibold">Useful Links</h3>
          <ul className="mt-4 space-y-3 text-gray-400">
            <li  className="flex items-center space-x-2 cursor-pointer hover:text-white">
              <Link className="w-5 h-5 text-green-400" /> <span>Help Center</span>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer hover:text-white">
              <Link className="w-5 h-5 text-green-400" /> <span>Terms & Conditions</span>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer hover:text-white">
              <Link className="w-5 h-5 text-green-400" /> <span>Privacy Policy</span>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer hover:text-white">
              <Link className="w-5 h-5 text-green-400" /> <span>Refund Policy</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-green-400" /> <span>+234 703 851 0966</span>
            </li>
            <li className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-green-400" /> <span>info@MustyDev.com</span>
            </li>
          </ul>
        </div>

        {/* Seller Info */}
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-white text-xl font-semibold">Interested in a Great Way</h3>
          <h3 className="text-green-400 text-xl font-bold">Make Money?</h3>
          <p className="text-gray-400 mt-4">
            A supermarket is a self-service shop offering a wide variety of food, beverages and household products.
          </p>
          <button className="mt-4 bg-green-500 px-6 py-3 rounded-lg text-white font-bold">
            Become a Seller
          </button>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 text-center text-gray-400 py-6">
        With ❤️ by MustyDev. Copyright © 2025 Xtra Theme.
      </div>
    </div>
  );
};

export default Footer;
