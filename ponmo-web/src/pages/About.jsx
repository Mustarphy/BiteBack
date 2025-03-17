import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Testimonials from "../components/Testmonies";

const AboutUs = () => {
  return (
    <div className="bg-green-50 py-12 px-6 md:px-20 ">
      <div className="mt-9 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Section - Animated Image */}
        <motion.div
          className="relative"
          whileHover={{
            scale: 1.05, // Slight zoom on hover
            x: [0, 8, -8, 0], // Move left-right
            y: [0, -8, 8, 0], // Move up-down
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }, // Smooth floating effect
          }}
        >
          <img
            src="/girlsShop.jpg" // Replace with the correct path
            alt="Family Shopping"
            className="w-full rounded-lg shadow-md"
          />
          {/* Overlay Box */}
          <div className="absolute bottom-6 left-6 bg-green-900 text-white p-6 rounded-lg w-[80%] md:w-[60%] shadow-lg">
            <p className="text-lg font-semibold">
              We've been delivering a fresh take on grocery shopping for more than{" "}
              <span className="text-green-400">35 years</span>
            </p>
          </div>
        </motion.div>

        {/* Right Section - Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            About  <span className="text-green-500 underline">BiteBack</span>
          </h2>
          <p className="text-gray-600 mt-4">
          At BiteBack, we believe that everyone deserves access to nutritious food and a chance to thrive. That's why we're dedicated to providing food assistance to those in need, while also promoting sustainability and community engagement. <br></br>
          We also strive to educate and empower individuals, families, and communities to make healthy food choices and live sustainable lifestyles.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mt-3">
           Our  <span className="text-green-500 underline">Story</span>
          </h2>
          <p className="text-gray-600 mt-4">
          BiteBack was founded in [2017] by a group of passionate individuals who saw the need for a more equitable and sustainable food system. Since then, we've grown into a vibrant community of volunteers, donors, and partners, all working together to make a difference.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {[
              "Compassion",
              "Sustainability",
              "Able to raise significant",
              "Offset against profits",
              "Community",
              "Integrity",
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 w-6 h-6" />
                <span className="text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default AboutUs;
