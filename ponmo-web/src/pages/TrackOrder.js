import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

function TrackOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        if (orderDoc.exists()) {
          setOrder({ id: orderDoc.id, ...orderDoc.data() });
        } else {
          setError('Order not found');
        }
      } catch (err) {
        setError('Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!order) return <div>Order not found</div>;

  const getStatusStep = () => {
    const statuses = ['pending', 'processing', 'shipped', 'delivered'];
    return statuses.indexOf(order.status) + 1;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Track Order #{orderId}</h1>
      
      {/* Progress Timeline */}
      <div className="relative">
        <div className="h-1 bg-gray-200 absolute w-full top-4"></div>
        <div className="flex justify-between relative">
          <div className={`step ${getStatusStep() >= 1 ? 'active' : ''}`}>
            <div className="text-sm mt-8">Order Placed</div>
          </div>
          <div className={`step ${getStatusStep() >= 2 ? 'active' : ''}`}>
            <div className="text-sm mt-8">Processing</div>
          </div>
          <div className={`step ${getStatusStep() >= 3 ? 'active' : ''}`}>
            <div className="text-sm mt-8">Shipped</div>
          </div>
          <div className={`step ${getStatusStep() >= 4 ? 'active' : ''}`}>
            <div className="text-sm mt-8">Delivered</div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="mt-12 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Order Date</p>
            <p>{new Date(order.paidAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <p className="capitalize">{order.status}</p>
          </div>
          <div>
            <p className="text-gray-600">Shipping Address</p>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.city}, {order.shipping.state}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Amount</p>
            <p>₦{order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder; 