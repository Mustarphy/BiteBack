import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { usePaystackPayment } from 'react-paystack';
import { validateShippingDetails } from '../utils/validation';
import { sendOrderConfirmation } from '../utils/orderNotifications';
import { generateReceipt } from '../utils/receiptGenerator';

const NIGERIAN_STATES = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { createOrder } = useOrders();

    const [shippingDetails, setShippingDetails] = useState({
        fullName: currentUser?.displayName || '',
        email: currentUser?.email || '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const [validationErrors, setValidationErrors] = useState({});
    const [orderId, setOrderId] = useState(null);
    const [orderData, setOrderData] = useState(null);

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        const errors = validateShippingDetails(shippingDetails);
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
        setValidationErrors({});
        setStep(2);
    };

    const handlePaystackSuccess = async (response) => {
      setIsLoading(true);
      setError('');
      try {
        if (response.status !== 'success') {
          setError('Payment failed. Please try again.');
          return;
        }
    
        const newOrderData = {
          items: cart,
          total: cartTotal,
          shipping: shippingDetails,
          paymentReference: response.reference,
          transactionId: response.transaction,
          status: 'paid',
          paymentMethod: response.channel || 'paystack',
          paidAt: new Date().toISOString()
        };
    
        const result = await createOrder(newOrderData);
        if (result.success) {
          await sendOrderConfirmation({ id: result.orderId, ...newOrderData });
          clearCart();
          setStep(3);
          setOrderId(result.orderId);
          setOrderData(newOrderData);
        } else {
          setError('Failed to create order. Please contact support with reference: ' + response.reference);
        }
      } catch (err) {
        console.error('Order creation error:', err);
        setError('Something went wrong. Please contact support with reference: ' + response.reference);
      } finally {
        setIsLoading(false);
      }
    };

    const handlePaystackClose = () => {
        setError('Payment cancelled. Please try again.');
    };

    const config = {
        reference: (new Date()).getTime().toString(),
        email: shippingDetails.email,
        amount: Math.round(cartTotal * 100),
        publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
        firstname: shippingDetails.fullName.split(' ')[0],
        lastname: shippingDetails.fullName.split(' ')[1] || '',
        phone: shippingDetails.phone,
        metadata: {
            custom_fields: [
                {
                    display_name: "Shipping Address",
                    variable_name: "shipping_address",
                    value: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}`
                }
            ]
        },
        currency: 'NGN',
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        onSuccess: handlePaystackSuccess,
        onClose: handlePaystackClose
    };

    console.log('Payment config:', config);

    const initializePayment = usePaystackPayment(config);

    const handlePaymentClick = async () => {
        setError('');
        setIsLoading(true);
        try {
            console.log("Initializing Payment...");
            await initializePayment();
            console.log("Payment Initialization Complete.");
        } catch (error) {
            console.error('Payment initialization error:', error);
            setError('Failed to initialize payment. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadReceipt = () => {
        if (orderData && orderId) {
            const doc = generateReceipt({ id: orderId, ...orderData });
            doc.save(`order-${orderId}.pdf`);
        }
    };

    if (cart.length === 0 && step !== 3) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <button
                        onClick={() => navigate('/shop')}
                        className="btn btn-primary"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-center space-x-4">
                    <div className={`step ${step >= 1 ? 'active' : ''}`}>Shipping</div>
                    <div className="h-px w-12 bg-gray-300" />
                    <div className={`step ${step >= 2 ? 'active' : ''}`}>Payment</div>
                    <div className="h-px w-12 bg-gray-300" />
                    <div className={`step ${step >= 3 ? 'active' : ''}`}>Confirmation</div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}

            {step === 1 && (
                <form onSubmit={handleShippingSubmit} className="max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                            <input type="text" name="fullName" value={shippingDetails.fullName} onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })} required className={`form-input ${validationErrors.fullName ? 'border-red-500' : ''}`} />
                            {validationErrors.fullName && <p className="text-red-500 text-sm mt-1">{validationErrors.fullName}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input type="email" name="email" value={shippingDetails.email} onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })} required className={`form-input ${validationErrors.email ? 'border-red-500' : ''}`} />
                            {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                            <input type="tel" name="phone" value={shippingDetails.phone} onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                required
                className={`form-input ${validationErrors.phone ? 'border-red-500' : ''}`}
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={shippingDetails.address}
                onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                required
                className={`form-input ${validationErrors.address ? 'border-red-500' : ''}`}
              />
              {validationErrors.address && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.address}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                City/Town
              </label>
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={(e) => {
                  // Allow letters, spaces, and hyphens
                  const value = e.target.value.replace(/[^a-zA-Z\s-]/g, '');
                  setShippingDetails({ ...shippingDetails, city: value });
                }}
                required
                className={`form-input ${validationErrors.city ? 'border-red-500' : ''}`}
                placeholder="Enter your city or town"
              />
              {validationErrors.city && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                State
              </label>
              <select
                name="state"
                value={shippingDetails.state}
                onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                required
                className={`form-input ${validationErrors.state ? 'border-red-500' : ''}`}
              >
                <option value="">Select a state</option>
                {NIGERIAN_STATES.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {validationErrors.state && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.state}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Postal Code (Optional)
              </label>
              <input
                type="text"
                name="zipCode"
                value={shippingDetails.zipCode}
                onChange={(e) => {
                  // Only allow numbers
                  const value = e.target.value.replace(/[^\d]/g, '');
                  // Limit to 6 digits
                  if (value.length <= 6) {
                    setShippingDetails({ ...shippingDetails, zipCode: value });
                  }
                }}
                className={`form-input ${validationErrors.zipCode ? 'border-red-500' : ''}`}
                placeholder="e.g., 100001"
                maxLength="6"
              />
              {validationErrors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.zipCode}</p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="mb-4">
              <h3 className="font-semibold">Order Total:</h3>
              <p className="text-2xl">₦{(cartTotal).toFixed(2)}</p>
            </div>
            <button
              onClick={handlePaymentClick}
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white p-8 rounded-lg shadow">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="mb-6 text-left bg-gray-50 p-4 rounded">
              <p className="font-semibold">Order Details:</p>
              <p className="text-sm text-gray-600">Order Total: ₦{cartTotal.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Shipping Address: {shippingDetails.address}</p>
              <p className="text-sm text-gray-600">Email: {shippingDetails.email}</p>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleDownloadReceipt}
                className="btn bg-green-500 text-white hover:bg-green-600 w-full"
              >
                Download Receipt
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="btn btn-primary w-full"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 w-full"
              >
                View Order History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Summary */}
      {step !== 3 && (
        <div className="mt-8 max-w-lg mx-auto">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout; 