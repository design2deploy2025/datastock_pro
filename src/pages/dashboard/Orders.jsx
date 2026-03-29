import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrdersTable from '../../components/dashboard/OrdersTable';
import CreateOrderModal from '../../components/dashboard/CreateOrderModal';

const Orders = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ date: '', items: '', qty: '', unitPrice: '' });
  const [errors, setErrors] = useState({});

  // Mock handleCreateOrder - logs and closes (extend later)
  const handleCreateOrder = () => {
    console.log('Order created:', newOrder, 'for order:', selectedOrder);
    // Reset and close
    setNewOrder({ date: '', items: '', qty: '', unitPrice: '' });
    setErrors({});
    setShowCreateOrderModal(false);
    setSelectedOrder(null);
  };

  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors({});
  };

  const calculateTotal = () => {
    const qty = parseFloat(newOrder.qty) || 0;
    const price = parseFloat(newOrder.unitPrice) || 0;
    const total = qty * price;
    return total.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  const closeCreateModal = () => {
    setShowCreateOrderModal(false);
    setNewOrder({ date: '', items: '', qty: '', unitPrice: '' });
    setErrors({});
    setSelectedOrder(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Map order to customer-like prop for modal
  const orderToCustomer = (order) => ({
    id: order.id,
    name: `${order.customerName} - Order ${order.displayId}`,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(order.customerName)}&background=1e293b&color=f8fafc&size=128&bold=true`,
    instagram: '@customer', // mock
    phone: '+91 98765 43210', // mock
    address: 'Order address mock', // mock
    totalOrdersValue: order.value,
    orders: [order] // self reference
  });

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setShowCreateOrderModal(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Sidebar />
      <main className="ml-0 md:ml-64 p-8 md:p-12 flex flex-col min-h-screen">
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Orders
            </h1>
            <p className="text-slate-400">Manage and view your orders with customer details.</p>
          </div>

          <OrdersTable onRowClick={handleRowClick} />

          {/* CreateOrderModal - reuse with order as customer */}
          {showCreateOrderModal && selectedOrder && (
            <CreateOrderModal
              customer={orderToCustomer(selectedOrder)}
              isOpen={showCreateOrderModal}
              onClose={closeCreateModal}
              onCreateOrder={handleCreateOrder}
              newOrder={newOrder}
              setNewOrder={setNewOrder}
              errors={errors}
              calculateTotal={calculateTotal}
              handleNewOrderChange={handleNewOrderChange}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;

