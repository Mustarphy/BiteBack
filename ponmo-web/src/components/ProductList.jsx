import React, { useState } from "react";
import HomeProduct from "./HomeProduct";


const products = [
//   {
//     id: 1,
//     name: "Fresh Apples",
//     description: "Organic and freshly picked apples from local farms.",
//     price: 5.99,
//     image: "/apple.jpg",
//   },
//   {
//     id: 2,
//     name: "Orange Juice",
//     description: "100% pure and freshly squeezed orange juice.",
//     price: 3.99,
//     image: "/orange-juice.jpg",
//   },
{
    id: 1,

    name: 'Ponmo',

    price: 10000,

    description: "Original Ponmo from Ijebu.",

    image: '/fryPonmo.jpg',

  },

 
  {
    id: 2,

    name: 'Ponmo Roast',

    price: 50000,

    image: '/ponmoroast.jpg',

    description: "100% Cow Skin",


  },


  {

    id: 3,

    name: 'Straw berry ',

    price: 1200,

    image: '/fruit5.png',

    description: "Cherry Fruit",



  },

  {

    id: 4,

    name: 'Banana',

    price: 3700,

    image: '/banan2.png.png',

    description: "Banana Fruit",



  },
  

  {

    id: 5,

    name: 'Juice',

    price: 5300,

    description: "100% pure and freshly squeezed orange juice.",

    image: '/juice.jpg',
 


  },

  {

    id: 6,

    name: 'Blueberry',

    price: 5300,

    description: "100% pure and freshly squeezed orange juice.",

    image: '/blueberry.jpg',



  },

  {

    id: 7,

    name: 'Swirl Breads',

    price: 3300,

    description: "100% Nutrition & Carbohydrates",

    image: '/swirl.jpg',

   

  },

  {

    id: 8,

    name: 'Kings Mills',

    price: 8300,

    description: "100% Nutrition & Carbohydrates",

    image: '/kingsmill.jpg',
 
  

  },

  // Add more products...
];

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState("");
  
    // Filter products based on search input
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="p-6">
        {/* Search Bar */}
        <div className="mb-6 flex justify-left">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
  
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <HomeProduct key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          )}
        </div>
      </div>
    );
  };

  export default ProductList;