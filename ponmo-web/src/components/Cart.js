import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to your cart to continue shopping.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="border rounded-md px-2 py-1"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              Total: ${cartTotal.toFixed(2)}
            </div>
            <Link
              to="/checkout"
              className="btn btn-primary"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart; 