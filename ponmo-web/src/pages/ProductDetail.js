import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// This would typically come from an API
const products = [
  {
    id: 1,

    name: 'Ponmo',

    price: 10000,

    image: '/fryPonmo.jpg',

    category: 'meats',
    inStock: true,
    description: '100% Cow Skin',
    features: [
      'Abudants Protein',
      'Unique Taste',
      'fats Contents',
      'Other Nutrients'
    ],
    specifications: {
      'Brand': 'Olutofarati',
      'Quality': 'Bajaj 250 naira',
      'Color': 'null',
      'Connectivity': 'null',
      'Type': 'Roasted'
    }
  },
  {
    id: 2,

    name: 'Snails',

    price: 4000,

    image: '/Snail.jpg',

    category: 'meats',
    inStock: true,
    description: 'Wonderful Roasted Snails protein-rich delicacy with a unique flavor. 100% natural and no preservatives!',
    features: [
      'Abudants Protein',
      'Unique Taste',
      'fats Contents',
      'Other Nutrients'
    ],
    specifications: {
      'Brand': 'Olutofarati',
      'Quality': 'small',
      'Color': 'null',
      'Connectivity': 'null',
      'Type': 'Roasted'
    }
  },

  {
    id: 3,

    name: 'Ponmo Package',

    price: 25000,

    image: '/ponmoPanckage.jpg',


    category: 'meats',
    inStock: true,
    description: '100% Cow Skin',
    features: [
      'Abudants Protein',
      'Unique Taste',
      'fats Contents',
      'Other Nutrients'
    ],
    specifications: {
      'Brand': 'Olutofarati',
      'Quality': 'small',
      'Color': 'null',
      'Connectivity': 'null',
      'Type': 'Dry'
    }
  },

  {
    id: 4,

    name: 'Ponmo recipe',

    price: 35000,

    image: '/ponmorecipe.jpg',

    category: 'meats',
    inStock: true,
    description: '100% Cow Skin',
    features: [
      'Abudants Protein',
      'Unique Taste',
      'fats Contents',
      'Other Nutrients'
    ],
    specifications: {
      'Brand': 'Olutofarati',
      'Quality': 'small',
      'Color': 'null',
      'Connectivity': 'null',
      'Type': 'Roasted'
    }
  },

  {
    id: 5,

    name: 'Dry Ponmo',

    price: 40000,

    image: '/ponmoDry.jpg',

    category: 'meats',
    inStock: true,
    description: '100% Cow Skin',
    features: [
      'Abudants Protein',
      'Unique Taste',
      'fats Contents',
      'Other Nutrients'
    ],
    specifications: {
      'Brand': 'Olutofarati',
      'Quality': 'small',
      'Color': 'null',
      'Connectivity': 'null',
      'Type': 'Dry'
    }
  },

  {
    id: 6,

    name: 'Ponmo Roasted',

    price: 50000,

    image: '/ponmoroast.jpg',

    category: 'meats',
    inStock: true,
    description: '100% Cow Skin',
    features: [
      'Abudants Protein',
      'Unique Taste',
      'fats Contents',
      'Other Nutrients'
    ],
    specifications: {
      'Brand': 'Olutofarati',
      'Quality': 'small',
      'Color': 'null',
      'Connectivity': 'null',
      'Type': 'Roasted'
    }
  },

  {
    id: 7,

    name: 'Strawberry',

    price: 1200,

    image: '/fruit5.png',
    category: 'fruits',
    inStock: true,
    description: 'Strawberry fruits',
    features: [
      'Nutrients',
      'Antioxideants',
      'Health benefitrs',
      'Other Nutrients'
    ],
    specifications: {
      'Brand': 'Shopfull',
      'Quality': '100%',
      'Color': 'null',
      'Connectivity': 'null',
      'Type': 'Fruits'
    }
  },
  
  
  // Add other products...
];

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-green-500">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="btn bg-green-500 w-full"
          >
            Add to Cart
          </button>

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="border rounded-lg">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div
                  key={key}
                  className={`flex py-2 px-4 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <span className="font-medium w-1/3">{key}</span>
                  <span className="w-2/3">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;