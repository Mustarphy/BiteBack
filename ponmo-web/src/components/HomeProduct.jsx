import React from "react";

const HomeProduct = ({ product }) => {
  if (!product) return null; // Prevents errors if product is undefined

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={product.image || "/placeholder.jpg"} // Uses fallback image
        alt={product.name || "Product Image"}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name || "Unnamed Product"}</h3>
        <p className="text-gray-600 text-sm mt-2">{product.description || "No description available."}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-green-600 font-bold text-lg">${product.price?.toLocaleString() || "N/A"}</span>
          <a href="/shop"n className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeProduct;
