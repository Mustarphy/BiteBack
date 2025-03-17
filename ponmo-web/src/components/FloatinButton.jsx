import { useState, useEffect } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { BsWhatsapp } from "react-icons/bs"; // Import WhatsApp icon

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // WhatsApp URL (Replace with your number)
  const whatsappNumber = "+2347050504918"; // Change to your WhatsApp number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-5 right-5 flex flex-col space-y-3 z-50">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        >
          <ChevronUpIcon className="h-6 w-6" />
        </button>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
      >
        <BsWhatsapp className="h-6 w-6" />
      </a>
    </div>
  );
};

export default FloatingButtons;
