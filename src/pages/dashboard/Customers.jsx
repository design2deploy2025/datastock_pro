import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreateOrderModal from '../../components/dashboard/CreateOrderModal';
import CustomersTable from '../../components/dashboard/CustomersTable';

const customers = [
{ 
    id: 1, 
    name: 'Sarah Johnson', 
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('Sarah Johnson')}&background=1e293b&color=f8fafc&size=128&bold=true`,
    instagram: '@sarahj_sells', 
    phone: '+91 98765 43210', 
    totalOrdersValue: '₹12,450',
    address: '123 Green Street, Mumbai, Maharashtra 400001',
    orders: [
      { date: '2024-10-15', items: 'T-Shirts x 3', value: '₹4,200' },
      { date: '2024-10-08', items: 'Hoodie x 1', value: '₹2,800' },
      { date: '2024-09-28', items: 'Jeans x 2', value: '₹5,450' }
    ]
  },
  { 
    id: 2, 
    name: 'Mike Chen', 
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('Mike Chen')}&background=1e293b&color=f8fafc&size=128&bold=true`,
    instagram: '@mikechen.shop', 
    phone: '+91 98765 43211', 
    totalOrdersValue: '₹8,750',
    address: '456 Oak Avenue, Bangalore, Karnataka 560001',
    orders: [
      { date: '2024-10-12', items: 'Sneakers x 2', value: '₹3,500' },
      { date: '2024-10-05', items: 'Caps x 4', value: '₹2,800' },
      { date: '2024-09-25', items: 'Socks x 5', value: '₹2,450' }
    ]
  },
  { 
    id: 3, 
    name: 'Emily Rodriguez', 
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('Emily Rodriguez')}&background=1e293b&color=f8fafc&size=128&bold=true`,
    instagram: '@emilyvibes_', 
    phone: '+91 98765 43212', 
    totalOrdersValue: '₹21,320',
    address: '789 Pine Road, Delhi, 110001',
    orders: [
      { date: '2024-10-18', items: 'Dresses x 4', value: '₹8,200' },
      { date: '2024-10-10', items: 'Skirts x 3', value: '₹6,120' },
      { date: '2024-10-02', items: 'Tops x 5', value: '₹7,000' }
    ]
  },
  { 
    id: 4, 
    name: 'David Patel', 
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('David Patel')}&background=1e293b&color=f8fafc&size=128&bold=true`,
    instagram: '@davidpatel.co', 
    phone: '+91 98765 43213', 
    totalOrdersValue: '₹5,680',
    address: '321 Elm Street, Hyderabad, Telangana 500001',
    orders: [
      { date: '2024-10-14', items: 'Shirts x 2', value: '₹2,100' },
      { date: '2024-10-07', items: 'Belts x 3', value: '₹1,890' },
      { date: '2024-09-30', items: 'Wallets x 2', value: '₹1,690' }
    ]
  },
  { 
    id: 5, 
    name: 'Lisa Wong', 
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('Lisa Wong')}&background=1e293b&color=f8fafc&size=128&bold=true`,
    instagram: '@lisawongstyle', 
    phone: '+91 98765 43214', 
    totalOrdersValue: '₹34,200',
    address: '567 Maple Lane, Chennai, Tamil Nadu 600001',
    orders: [
      { date: '2024-10-19', items: 'Jackets x 3', value: '₹12,300' },
      { date: '2024-10-13', items: 'Pants x 4', value: '₹9,800' },
      { date: '2024-10-06', items: 'Shoes x 2', value: '₹12,100' }
    ]
  },
  { 
    id: 6, 
    name: 'Alex Turner', 
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('Alex Turner')}&background=1e293b&color=f8fafc&size=128&bold=true`,
    instagram: '@alexturner_gear', 
    phone: '+91 98765 43215', 
    totalOrdersValue: '₹16,890',
    address: '890 Cedar Blvd, Pune, Maharashtra 411001',
    orders: [
      { date: '2024-10-16', items: 'Backpacks x 2', value: '₹5,600' },
      { date: '2024-10-09', items: 'Luggage x 1', value: '₹6,800' },
      { date: '2024-10-01', items: 'Gear x 3', value: '₹4,490' }
    ]
  },
  { 
    id: 7, 
    name: 'Rachel Kim', 
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('Rachel Kim')}&background=1e293b&color=f8fafc&size=128&bold=true`,
    instagram: '@rachelk_boutique', 
    phone: '+91 98765 43216', 
    totalOrdersValue: '₹9,120',
    address: '234 Birch Court, Kolkata, West Bengal 700001',
    orders: [
      { date: '2024-10-17', items: 'Bags x 3', value: '₹3,450' },
      { date: '2024-10-11', items: 'Scarves x 4', value: '₹2,670' },
      { date: '2024-10-04', items: 'Jewelry x 2', value: '₹3,000' }
    ]
  },
];

const Customers = () => {
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [showCreateOrderModal, setShowCreateOrderModal] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editCustomer, setEditCustomer] = React.useState({});

  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  // Make customers mutable with useState
  const [customersList, setCustomersList] = React.useState(customers);



  const [newOrder, setNewOrder] = React.useState({ date: '', items: '', qty: '', unitPrice: '' });
  const [errors, setErrors] = React.useState({});

  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors({});
    }
  };

  const calculateTotal = () => {
    const qty = parseFloat(newOrder.qty) || 0;
    const price = parseFloat(newOrder.unitPrice) || 0;
    const total = qty * price;
    return total.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newOrder.date) newErrors.date = 'Date is required';
    if (!newOrder.items) newErrors.items = 'Items description is required';
    if (!newOrder.qty || parseFloat(newOrder.qty) <= 0) newErrors.qty = 'Quantity must be > 0';
    if (!newOrder.unitPrice || parseFloat(newOrder.unitPrice) <= 0) newErrors.unitPrice = 'Unit price must be > 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateOrder = () => {
    if (!validateForm()) return;

    const qty = parseFloat(newOrder.qty);
    const unitPrice = parseFloat(newOrder.unitPrice);
    const total = qty * unitPrice;
    const totalStr = `₹${total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    const itemsStr = `${newOrder.items} x ${qty}`;

    const newOrderObj = {
      date: newOrder.date,
      items: itemsStr,
      value: totalStr
    };

    // Update customersList
    setCustomersList(prev => prev.map(customer => 
      customer.id === selectedCustomer.id 
        ? {
            ...customer,
            orders: [...customer.orders, newOrderObj],
            totalOrdersValue: `₹${(parseFloat(customer.totalOrdersValue.replace(/[^0-9]/g, '')) + total).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
          }
        : customer
    ));

    // Reset form and close modal
    setNewOrder({ date: '', items: '', qty: '', unitPrice: '' });
    setShowCreateOrderModal(false);
  };

  const closeCreateModal = () => {
    setShowCreateOrderModal(false);
    setNewOrder({ date: '', items: '', qty: '', unitPrice: '' });
    setErrors({});
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getAvatar = (name) => {
    if (!name) return '';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name.split(' ').map(n => n[0]).join(''))}&background=1e293b&color=f8fafc&size=128&bold=true`;
  };

  const handleEditStart = () => {
    setEditCustomer({ ...selectedCustomer });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditCustomer({});
  };

  const validateEdit = () => {
    const { name, instagram, phone, address } = editCustomer;
    if (!name?.trim() || !instagram?.trim() || !phone?.trim() || !address?.trim()) {
      return false;
    }
    return true;
  };

  const handleSaveEdit = () => {
    if (!validateEdit()) {
      alert('Please fill all fields: name, instagram, phone, address.');
      return;
    }

    setCustomersList(prev => prev.map(cust => 
      cust.id === selectedCustomer.id 
        ? { ...cust, ...editCustomer, avatar: getAvatar(editCustomer.name) }
        : cust
    ));

    setSelectedCustomer(prev => ({ ...prev, ...editCustomer, avatar: getAvatar(editCustomer.name) }));
    setIsEditing(false);
    setEditCustomer({});
  };

  const handleEditChange = (field) => (e) => {
    const value = e.target.value;
    setEditCustomer(prev => ({ ...prev, [field]: value }));
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setIsEditing(false);
    setEditCustomer({});
  };

  const orderCount = selectedCustomer?.orders?.length || 0;
  const totalNum = parseFloat(selectedCustomer?.totalOrdersValue?.replace(/[^0-9]/g, '') || 0);
  const avgOrder = orderCount > 0 ? Math.round(totalNum / orderCount) : 0;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Sidebar />
      <main className="ml-0 md:ml-64 p-8 md:p-12 flex flex-col min-h-screen">
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Customers
            </h1>
            <p className="text-slate-400">Manage and view your customer list.</p>
          </div>

          <CustomersTable data={customersList} onRowClick={setSelectedCustomer} />
        </div>
      </main>

      {/* Landscape Customer Modal */}
      {selectedCustomer && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300"
            onClick={closeModal}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-8 animate-in slide-in-from-bottom-4 duration-300 fade-in-0">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-6xl h-[85vh] max-h-[95vh] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="p-6 lg:p-8 pb-4 border-b border-white/10 sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10 flex-shrink-0">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
                  <div className="flex items-center gap-4 lg:gap-6">
                    <img 
                      src={isEditing ? getAvatar(editCustomer.name) : selectedCustomer.avatar} 
                      alt={isEditing ? editCustomer.name : selectedCustomer.name}
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl ring-2 ring-white/20 shadow-lg flex-shrink-0 hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        e.target.src = getAvatar(isEditing ? editCustomer.name : selectedCustomer.name);
                      }}
                    />
                    <div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editCustomer.name || ''}
                          onChange={handleEditChange('name')}
                          className="text-2xl lg:text-3xl font-bold bg-transparent border-b border-white/30 focus:border-white focus:outline-none bg-slate-900/50 px-2 py-1 text-transparent bg-clip-text from-white to-slate-200 leading-tight w-full"
                          placeholder="Enter customer name"
                          autoFocus
                        />
                      ) : (
                        <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent leading-tight">
                          {selectedCustomer.name}
                        </h2>
                      )}
                      <p className="text-sm lg:text-base text-slate-400 mt-1 font-medium">
                        {orderCount} orders • Avg order ₹{avgOrder.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button onClick={closeModal} className="p-2 lg:p-3 hover:bg-slate-800/50 rounded-xl transition-all group flex-shrink-0">
                    <svg className="w-6 h-6 lg:w-7 lg:h-7 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>



                <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
                  {/* 4 Contact Blocks in Single Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Instagram */}
                    <div className={isEditing ? 'p-4 bg-slate-800/70 rounded-xl border-2 border-yellow-400/50' : 'group p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl border border-white/10 transition-all cursor-pointer'}>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-pink-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.921.146-6.462 2.556-6.61 6.611-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.148 4.955 2.683 6.611 6.61 6.61 1.28.059 1.688.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.924-.146 6.464-2.541 6.61-6.61.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.146-4.92-2.556-6.61-6.611-6.61-1.28-.059-1.689-.073-4.948-.073z"/>
                          <path d="M12 5.839c-2.847 0-5.158 2.311-5.158 5.158s2.311 5.158 5.158 5.158 5.158-2.311 5.158-5.158-2.311-5.158-5.158-5.158z"/>
                          <path d="M15.663 11.998h-1.68v-1.679h2.928v1.679h-1.248v3.553h-1.001V11.998z"/>
                        </svg>
                        <span className="font-semibold text-slate-200 text-sm">Instagram</span>
                      </div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editCustomer.instagram || ''}
                          onChange={handleEditChange('instagram')}
                          className="w-full bg-slate-900/80 backdrop-blur-sm border border-yellow-400/50 rounded-lg px-3 py-2 text-slate-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/70 transition-all"
                          placeholder="@username"
                        />
                      ) : (
                        <p 
                          className="text-slate-300 font-mono text-sm break-all cursor-pointer hover:text-pink-300 transition-colors"
                          onClick={async () => await navigator.clipboard.writeText(selectedCustomer.instagram)}
                        >
                          {selectedCustomer.instagram}
                        </p>
                      )}
                    </div>
                    {/* Phone */}
                    <div className={isEditing ? 'p-4 bg-slate-800/70 rounded-xl border-2 border-yellow-400/50' : 'group p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl border border-white/10 transition-all cursor-pointer'}>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="font-semibold text-slate-200 text-sm">Phone</span>
                      </div>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editCustomer.phone || ''}
                          onChange={handleEditChange('phone')}
                          className="w-full bg-slate-900/80 backdrop-blur-sm border border-yellow-400/50 rounded-lg px-3 py-2 text-slate-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/70 transition-all"
                          placeholder="+91 98765 43210"
                        />
                      ) : (
                        <p 
                          className="text-slate-300 font-mono text-sm cursor-pointer hover:text-emerald-300 transition-colors"
                          onClick={async () => await navigator.clipboard.writeText(selectedCustomer.phone)}
                        >
                          {selectedCustomer.phone}
                        </p>
                      )}
                    </div>
                    {/* Address */}
                    <div className={isEditing ? 'p-4 bg-slate-800/70 rounded-xl border-2 border-yellow-400/50 sm:col-span-2 lg:col-span-1' : 'p-4 bg-slate-800/30 rounded-xl border border-white/10 sm:col-span-2 lg:col-span-1'}>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-semibold text-slate-200 text-sm">Address</span>
                      </div>
                      {isEditing ? (
                        <textarea
                          value={editCustomer.address || ''}
                          onChange={handleEditChange('address')}
                          rows={2}
                          className="w-full bg-slate-900/80 backdrop-blur-sm border border-yellow-400/50 rounded-lg px-3 py-2 text-slate-200 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-yellow-400/70 transition-all resize-vertical"
                          placeholder="Enter full address"
                        />
                      ) : (
                        <p className="text-slate-300 text-sm leading-relaxed">{selectedCustomer.address}</p>
                      )}
                    </div>
                    {/* LTV */}
                    <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 border border-emerald-400/30 rounded-xl text-center">
                      <p className="text-emerald-300 text-xs uppercase tracking-wide font-medium">Lifetime Value</p>
                      <p className="text-xl font-bold text-white mt-1">{selectedCustomer.totalOrdersValue}</p>
                      <p className="text-emerald-300 text-xs mt-1">{orderCount} orders</p>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m-1-4H3m6 4h1m-1 4h1m-1-4H3m6 4h1m-1 4h1" />
                      </svg>
                      Recent Orders ({orderCount})
                    </h4>
                    <div className="space-y-3">
                      {selectedCustomer.orders.slice(0, 5).map((order, index) => {
                        // Parse items like "T-Shirts x 3" -> product, qty
                        const itemsMatch = order.items.match(/(.+?)\s*x\s*(\d+)/);
                        const product = itemsMatch ? itemsMatch[1].trim() : order.items;
                        const qty = itemsMatch ? parseInt(itemsMatch[2]) : 1;
                        const totalPrice = parseFloat(order.value.replace(/[^0-9.]/g, ''));
                        const unitPrice = qty > 0 ? (totalPrice / qty).toFixed(0) : 0;
                        
                        return (
                          <div key={index} className="p-4 bg-slate-800/30 hover:bg-slate-700/50 rounded-xl border border-white/10 transition-all group">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-2">
                              <div className="text-slate-300 font-mono text-xs font-semibold">
                                {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 text-sm">
                                <div className="font-semibold text-white truncate">{product}</div>
                                <div className="text-slate-400">Qty: {qty}</div>
                                <div className="text-slate-400">Unit: ₹{unitPrice}</div>
                              </div>
                              <div className="text-right font-bold text-emerald-400 text-base whitespace-nowrap">
                                ₹{order.value}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                      <p className="text-slate-400 text-xs uppercase tracking-wide">Total Spent</p>
                      <p className="text-2xl font-bold text-white">₹{totalNum.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                      <p className="text-slate-400 text-xs uppercase tracking-wide">Orders</p>
                      <p className="text-2xl font-bold text-emerald-400">{orderCount}</p>
                    </div>
                    <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                      <p className="text-slate-400 text-xs uppercase tracking-wide">Avg Order</p>
                      <p className="text-2xl font-bold text-blue-400">₹{avgOrder.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/10 bg-slate-900/95 backdrop-blur-sm sticky bottom-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {isEditing ? (
                      <>
                        <button 
                          onClick={handleCancelEdit}
                          className="flex-1 px-6 py-4 bg-slate-700/50 hover:bg-slate-600 text-slate-200 font-semibold rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Cancel
                        </button>
                        <button 
                          onClick={handleSaveEdit}
                          disabled={!validateEdit()}
                          className="flex-1 px-6 py-4 bg-emerald-600/80 hover:bg-emerald-500 disabled:bg-emerald-700/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all border border-emerald-400/30 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/25"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={handleEditStart}
                          className="flex-1 px-6 py-4 bg-blue-600/80 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all border border-blue-400/30 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Details
                        </button>
                        <button 
                          onClick={() => setShowCreateOrderModal(true)}
                          className="flex-1 px-6 py-4 bg-emerald-600/80 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all border border-emerald-400/30 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/25"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Create Order
                        </button>
                      </>
                    )}
                  </div>
                </div>
            </div>
          </div>
          <CreateOrderModal
            customer={selectedCustomer}
            isOpen={showCreateOrderModal}
            onClose={closeCreateModal}
            onCreateOrder={handleCreateOrder}
            newOrder={newOrder}
            setNewOrder={setNewOrder}
            errors={errors}
            calculateTotal={calculateTotal}
            handleNewOrderChange={handleNewOrderChange}
          />
        </>
      )}
    </div>
  );
};

export default Customers;

