import { useState } from 'react';
import ProductCard from '../components/ProductCard';

// Sample product data (replace with your actual data/API)
const products = [
  {
    id: 1,

    name: 'Ponmo',

    price: 10000,

    image: '/fryPonmo.jpg',

    category: 'meats',

    inStock: true,

  },

  {
    id: 2,

    name: 'Snails',

    price: 4000,

    image: '/Snail.jpg',

    category: 'meats',

    inStock: false,

  },

  {
    id: 3,

    name: 'Ponmo Package',

    price: 25000,

    image: '/ponmoPanckage.jpg',

    category: 'meats',

    inStock: true,

  },

  {
    id: 4,

    name: 'Ponmo recipe',

    price: 35000,

    image: '/ponmorecipe.jpg',

    category: 'meats',

    inStock: true,

  },

  {
    id: 5,

    name: 'Dry Ponmo',

    price: 40000,

    image: '/ponmoDry.jpg',

    category: 'meats',

    inStock: true,

  },

  {
    id: 6,

    name: 'Ponmo Roasted',

    price: 50000,

    image: '/ponmoroast.jpg',

    category: 'meats',

    inStock: true,

  },


  {

    id: 7,

    name: 'Strawberry',

    price: 1200,

    image: '/fruit5.png',
    category: 'fruits',
    inStock: true,

  },

  {

    id: 8,

    name: 'Apple',

    price: 3500,

    image: '/apple.jpg',
    category: 'fruits',
    inStock: true,

  },

  {

    id: 9,

    name: 'Banana',

    price: 3700,

    image: '/banan2.png.png',
    category: 'fruits',
    inStock: true,

  },
  
  {

    id: 10,

    name: 'Water melon',

    price: 1400,

    image: '/watermelon.png.png',
    category: 'fruits',
    inStock: true,

  },

  {

    id: 11,

    name: 'Juice',

    price: 5300,

    image: '/juice.jpg',
    category: 'drinks',
    inStock: true,

  },

  {

    id: 12,

    name: 'Juice',

    price: 5300,

    image: '/drinks.png',
    category: 'drinks',
    inStock: true,

  },

  {

    id: 13,

    name: 'Drinks',

    price: 5300,

    image: '/drinks2.png',
    category: 'drinks',
    inStock: true,

  },
  {

    id: 14,

    name: 'Orange Juice',

    price: 7300,

    image: '/orange.jpg',
    category: 'drinks',
    inStock: true,

  },

  {

    id: 15,

    name: 'Blueberry',

    price: 5300,

    image: '/blueberry.jpg',
    category: 'drinks',
    inStock: true,

  },

  {

    id: 16,

    name: 'Weber Breads',

    price: 5300,

    image: '/weber.jpg',
    category: 'breads',
    inStock: true,

  },

  {

    id: 17,

    name: 'Swirl Breads',

    price: 8300,

    image: '/swirl.jpg',
    category: 'breads',
    inStock: true,

  },

  {

    id: 18,

    name: 'Kings Mills',

    price: 8300,

    image: '/kingsmill.jpg',
    category: 'breads',
    inStock: true,

  },

  // Add more products...
];

const categories = ['All', 'Meats', 'Fruits', 'Drinks', 'Breads'];

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  // const [sortBy, setSortBy] = useState('featured');
  // const [priceRange, setPriceRange] = useState([0, 1000]);

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || 
    product.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-4 py-2 rounded-md ${
                    selectedCategory === category
                      ? 'bg-green-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* <div> */}
            {/* <h3 className="text-lg font-semibold mb-4">Price Range</h3> */}
            {/* <div className="px-4"> */}
              {/* <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              /> */}
              {/* <div className="flex justify-between mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div> */}
            {/* </div> */}
          {/* </div> */}
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Products</h2>
            {/* <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-4 py-2"
            > */}
              {/* <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option> */}
            {/* </select> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop; 