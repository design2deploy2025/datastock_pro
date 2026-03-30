import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrdersTable from '../../components/dashboard/OrdersTable';
import CreateOrderModal from '../../components/dashboard/CreateOrderModal';

const Orders = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const onOrderUpdate = (updatedOrder) => {
    setOrders(prev => prev.map(order => order.id === updatedOrder.id ? updatedOrder : order));
    console.log('✅ Order updated inline:', updatedOrder);
  };

  const [orders, setOrders] = useState([
    { 
      id: 1, 
      displayId: 'ORD-20241020-001',
      date: '2024-10-20',
      productName: 'T-Shirt Premium Cotton x 3',
      value: '₹4,200',
      invoiceUrl: '#',
      customerName: 'Sarah Johnson',
      status: 'Delivered',
      paymentStatus: 'Paid',
      source: 'Instagram',
      products: [{name: 'T-Shirt Premium Cotton', price: 1400, qty: 3}]
    },
    { 
      id: 2, 
      displayId: 'ORD-20241019-002', 
      date: '2024-10-19',
      productName: 'Hoodie Winter Fleece',
      value: '₹2,800',
      invoiceUrl: '#',
      customerName: 'Lisa Wong',
      status: 'Shipped',
      paymentStatus: 'Paid',
      source: 'Website',
      products: [{name: 'Hoodie Winter Fleece', price: 2800, qty: 1}]
    }
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalMode, setModalMode] = useState('view'); // 'view' | 'edit' | 'create'
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ date: '', items: '', qty: '', unitPrice: '', orderId: '', paymentType: '', paymentStatus: '', orderStatus: '', source: '' });
  const [errors, setErrors] = useState({});

  const handleSaveOrder = (updatedOrderData) => {
    if (modalMode === 'create') {
      // Add new order to state (persist frontend)
      setOrders(prev => [updatedOrderData, ...prev]);
      console.log('✅ New order created & persisted:', updatedOrderData);
    } else if (modalMode === 'edit' && selectedOrder) {
      setOrders(prev => prev.map(order => order.id === selectedOrder.id ? { ...order, ...updatedOrderData } : order));
      setSelectedOrder(updatedOrderData);
      console.log('✅ Order updated:', updatedOrderData);
    }
    // Reset and close
    setNewOrder({ date: '', items: '', qty: '', unitPrice: '', orderId: '', paymentType: '', paymentStatus: '', orderStatus: '', source: '' });
    setErrors({});
    setShowCreateOrderModal(false);
    setSelectedOrder(null);
    setModalMode('view');
  };

  const handleEditOrder = () => {
    setModalMode('edit');
  };

  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors({});
  };

  const openNewOrder = () => {
    setModalMode('create');
    setSelectedOrder(null);
    setShowCreateOrderModal(true);
    setNewOrder({ date: '', items: '', qty: '', unitPrice: '', orderId: '', paymentType: '', paymentStatus: '', orderStatus: '', source: '' });
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setModalMode('view');
    setShowCreateOrderModal(true);
  };

  const calculateTotal = () => {
    const qty = parseFloat(newOrder.qty) || 0;
    const price = parseFloat(newOrder.unitPrice) || 0;
    const total = qty * price;
    return total.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  const closeCreateModal = () => {
    setShowCreateOrderModal(false);
    setNewOrder({ date: '', items: '', qty: '', unitPrice: '', orderId: '', paymentType: '', paymentStatus: '', orderStatus: '', source: '' });
    setErrors({});
    setSelectedOrder(null);
    setModalMode('view');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };



  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Sidebar />
      <main className="ml-0 md:ml-64 p-8 md:p-12 flex flex-col min-h-screen">
          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                  Orders
                </h1>
                <p className="text-slate-400">Manage and view your orders with customer details.</p>
              </div>
              <button
                onClick={openNewOrder}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 whitespace-nowrap"
              >
                + New Order
              </button>
            </div>

            <OrdersTable data={orders} onRowClick={handleRowClick} onOrderUpdate={onOrderUpdate} />

          {showCreateOrderModal && (
            <CreateOrderModal
              mode={modalMode}
              order={selectedOrder}
              customerName={selectedOrder?.customerName || ''}
              isOpen={showCreateOrderModal}
              onClose={closeCreateModal}
              onSaveOrder={handleSaveOrder}
              newOrder={newOrder}
              setNewOrder={setNewOrder}
              handleNewOrderChange={handleNewOrderChange}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;

