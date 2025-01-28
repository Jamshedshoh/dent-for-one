import { useEffect } from 'react';
import { useOrder } from '../../contexts/OrderContext';
import { Layout } from '../Layout';

export const Orders = () => {
  const { orders, getOrders, cancelOrder } = useOrder();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="border-t border-b py-4 mb-4">
                {order.order_items.map((item: any) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold">Total: ${order.total.toFixed(2)}</span>
                {order.status === 'pending' && (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No orders found
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}; 