import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();



  const handleAddToCart = (e) => {

    e.preventDefault(); // Prevent navigation from Link

    addToCart(product);

  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="text-gray-600 mt-1">${product.price}</p>
          <div className="mt-4 flex justify-between items-center">
          <button onClick={handleAddToCart}className="btn bg-green-500 text-white" disabled={!product.inStock}> Add to Cart </button>
            <span className="text-sm text-gray-500">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard; 