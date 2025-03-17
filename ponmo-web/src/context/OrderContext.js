import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const fetchOrders = useCallback(async () => {
    if (!currentUser) return;
    
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef,
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const createOrder = async (orderData) => {
    try {
      const ordersRef = collection(db, 'orders');
      const newOrder = {
        ...orderData,
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
        status: 'pending',
        currency: 'NGN'
      };
      
      const docRef = await addDoc(ordersRef, newOrder);
      const order = { id: docRef.id, ...newOrder };
      
      setOrders(prev => [order, ...prev]);
      return { success: true, orderId: docRef.id };
    } catch (error) {
      console.error('Error creating order:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    orders,
    loading,
    createOrder,
    fetchOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
} 