import React, { useState, useEffect } from 'react';
import CreateCustomerModal from './CreateCustomerModal';

const mockProducts = [
  { id: 1, name: 'T-Shirt Premium Cotton', price: 1400 },
  { id: 2, name: 'Hoodie Winter Fleece', price: 2800 },
  { id: 3, name: 'Jeans Slim Fit', price: 2725 },
  { id: 4, name: 'Sneakers Air Max', price: 3500 },
  { id: 5, name: 'Dress Floral Maxi', price: 8200 },
  { id: 6, name: 'Jacket Leather Bomber', price: 12300 },
  { id: 7, name: 'Backpack Travel Pro', price: 5600 },
  { id: 8, name: 'Cap Baseball', price: 700 },
  { id: 9, name: 'Belt Leather', price: 630 },
  { id: 10, name: 'Wallet Slim', price: 845 },
  { id: 11, name: 'Shirt Casual', price: 1050 },
  { id: 12, name: 'Skirt Pleated', price: 2040 },
  { id: 13, name: 'Scarf Wool', price: 668 },
  { id: 14, name: 'Jewelry Set', price: 1500 },
  { id: 15, name: 'Bag Tote', price: 1150 }
];

const mockCustomers = [
  { id: 1, name: 'Sarah Johnson', avatar: 'https://ui-avatars.com/api/?name=SJ&background=1e293b&color=f8fafc&size=128&bold=true' },
  { id: 2, name: 'Mike Chen', avatar: 'https://ui-avatars.com/api/?name=MC&background=1e293b&color=f8fafc&size=128&bold=true' },
  { id: 3, name: 'Emily Rodriguez', avatar: 'https://ui-avatars.com/api/?name=ER&background=1e293b&color=f8fafc&size=128&bold=true' },
  { id: 4, name: 'Lisa Wong', avatar: 'https://ui-avatars.com/api/?name=LW&background=1e293b&color=f8fafc&size=128&bold=true' },
  { id: 5, name: 'Rachel Kim', avatar: 'https://ui-avatars.com/api/?name=RK&background=1e293b&color=f8fafc&size=128&bold=true' }
];

const CreateOrderModal = ({ 
  isOpen, 
  onClose, 
  onSaveOrder, 
  customer: propCustomer,
  order: propOrder,
  mode = 'create',
  newOrder: propNewOrder,
  setNewOrder: propSetNewOrder,
  handleNewOrderChange: propHandleNewOrderChange 
}) => {
  if (!isOpen) return null;

  const isView = mode === 'view';
  const isEdit = mode === 'edit';

  // Local state (override props if needed for standalone)
  const [customer, setCustomer] = useState(propCustomer || null);
  const [orderId, setOrderId] = useState(propOrder?.displayId || '');
  const [orderDate, setOrderDate] = useState(propOrder?.date || '');
  const [orderStatus, setOrderStatus] = useState(propOrder?.status || '');
  const [paymentStatus, setPaymentStatus] = useState(propOrder?.paymentStatus || '');
  const [source, setSource] = useState(propOrder?.source || '');
  const [selectedProducts, setSelectedProducts] = useState(propOrder?.products || []);
  const [productSearch, setProductSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [showCreateCustomerModal, setShowCreateCustomerModal] = useState(false);

  // Sync local state to parent props
  React.useEffect(() => {
    if (propSetNewOrder && propHandleNewOrderChange) {
      const syncField = (name, value) => {
        propHandleNewOrderChange({ target: { name, value } });
      };
      syncField('orderId', orderId);
      syncField('date', orderDate);
      syncField('status', orderStatus);
      syncField('paymentStatus', paymentStatus);
      syncField('source', source);
      syncField('items', JSON.stringify(selectedProducts));
    }
  }, [orderId, orderDate, orderStatus, paymentStatus, source, selectedProducts, propSetNewOrder, propHandleNewOrderChange]);

  const filteredProducts = mockProducts.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const itemsCount = selectedProducts.reduce((sum, p) => sum + p.qty, 0);
  const totalValue = selectedProducts.reduce((sum, p) => {
    return sum + (p.price * p.qty * (1 - (p.discount || 0) / 100));
  }, 0);
  const avgPrice = itemsCount > 0 ? Math.round(totalValue / itemsCount) : 0;

  const addProduct = (product) => {
    if (selectedProducts.find(p => p.id === product.id)) return;
    setSelectedProducts([...selectedProducts, { ...product, qty: 1, discount: 0 }]);
  };

  const updateQty = (id, delta) => {
    setSelectedProducts(prev => prev.map(p => 
      p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p
    ));
  };

  const updateDiscount = (id, value) => {
    const disc = Math.max(0, Math.min(100, parseFloat(value) || 0));
    setSelectedProducts(prev => prev.map(p => p.id === id ? { ...p, discount: disc } : p));
  };

  const removeProduct = (id) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleSave = () => {
    const orderData = {
      id: Date.now(),
      customerName: customer?.name || '',
      displayId: orderId,
      date: orderDate,
      status: orderStatus,
      paymentStatus,
      source,
      products: selectedProducts,
      productName: selectedProducts.map(p => `${p.name} x ${p.qty}`).join(', ') || 'Multiple',
      value: `₹${totalValue.toLocaleString('en-IN')}`,
      itemsCount,
      avgPrice,
      invoiceUrl: '#'
    };
    onSaveOrder?.(orderData);
    // Show success
    console.log('✅ Order saved:', orderData);
    alert(`Order ${orderId || 'New'} saved successfully! Total: ₹${totalValue.toLocaleString('en-IN')}`);
  };

  const getCustomerAvatar = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name?.split(' ').map(n => n[0]).join('') || 'C')}&background=1e293b&color=f8fafc&size=128&bold=true`;
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-8 animate-in slide-in-from-bottom-4 duration-300 fade-in-0">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-6xl h-[85vh] max-h-[95vh] flex flex-col overflow-hidden">
          {/* Header - EXACT copy from customer modal */}
          <div className="p-6 lg:p-8 pb-4 border-b border-white/10 sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10 flex-shrink-0">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
              <div className="flex items-center gap-4 lg:gap-6">
                <img 
                  src={customer ? getCustomerAvatar(customer.name) : getCustomerAvatar('Customer')}
                  alt={customer?.name || 'Customer'}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl ring-2 ring-white/20 shadow-lg flex-shrink-0 hover:scale-105 transition-transform duration-200"
                />
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent leading-tight">
                    {isView ? 'Order Details' : isEdit ? 'Edit Order' : 'New Order'}
                    {!isView && (
                      <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="ml-2 text-emerald-400 font-mono text-sm bg-transparent border-b border-emerald-400/50 focus:border-emerald-400"
                        placeholder="#001"
                      />
                    )}
                  </h2>
                  <p className="text-sm lg:text-base text-slate-400 mt-1 font-medium">
                    {customer?.name || 'Select Customer'} • {itemsCount} items • ₹{avgPrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 lg:p-3 hover:bg-slate-800/50 rounded-xl transition-all group flex-shrink-0">
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500">
            {/* 4 Contact Cards - EXACT structure, adapted for order fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Order ID */}
              <div className={`p-4 bg-slate-800/70 rounded-xl border-2 border-emerald-400/50 group hover:bg-slate-700/50 hover:border-emerald-400/70 ${isView ? 'cursor-default' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span className="font-semibold text-slate-200 text-sm">Order ID</span>
                </div>
                {isView ? (
                  <p className="text-emerald-300 font-mono text-sm font-semibold">{propOrder?.displayId || 'N/A'}</p>
                ) : (
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full bg-slate-900/80 backdrop-blur-sm border border-emerald-400/50 rounded-lg px-3 py-2 text-emerald-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/70 transition-all font-semibold"
                    placeholder="ORD-20241020-001"
                  />
                )}
              </div>

              {/* Order Status - matching badge style */}
              <div className={`p-4 rounded-xl border border-white/10 text-center ${isView ? 'bg-gradient-to-r from-emerald-500/10 to-blue-500/10' : 'bg-slate-800/70 border-2 border-yellow-400/50 group hover:bg-slate-700/50 hover:border-yellow-400/70'}`}>
                <p className="text-xs uppercase tracking-wide font-medium text-slate-400 mb-1">Order Status</p>
                {isView ? (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    propOrder?.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' :
                    propOrder?.status === 'Shipped' ? 'bg-blue-500/20 text-blue-300 border-blue-400/30' :
                    propOrder?.status === 'Cancelled' ? 'bg-red-500/20 text-red-300 border-red-400/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                  }`}>
                    {propOrder?.status}
                  </span>
                ) : (
                  <select 
                    value={orderStatus} 
                    onChange={(e) => setOrderStatus(e.target.value)}
                    className="w-full bg-slate-900/80 backdrop-blur-sm border border-yellow-400/50 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                )}
              </div>

              {/* Payment Status */}
              <div className={`p-4 rounded-xl border border-white/10 text-center ${isView ? 'bg-gradient-to-r from-emerald-500/10 to-blue-500/10' : 'bg-slate-800/70 border-2 border-yellow-400/50 group hover:bg-slate-700/50 hover:border-yellow-400/70'}`}>
                <p className="text-xs uppercase tracking-wide font-medium text-slate-400 mb-1">Payment</p>
                {isView ? (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    propOrder?.paymentStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' :
                    propOrder?.paymentStatus === 'Refunded' ? 'bg-red-500/20 text-red-300 border-red-400/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                  }`}>
                    {propOrder?.paymentStatus}
                  </span>
                ) : (
                  <select 
                    value={paymentStatus} 
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full bg-slate-900/80 backdrop-blur-sm border border-yellow-400/50 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                )}
              </div>

              {/* Source */}
              <div className={`p-4 rounded-xl border border-white/10 text-center ${isView ? 'bg-slate-800/30' : 'bg-slate-800/70 border-2 border-yellow-400/50 group hover:bg-slate-700/50 hover:border-yellow-400/70'}`}>
                <p className="text-xs uppercase tracking-wide font-medium text-slate-400 mb-1">Source</p>
                {isView ? (
                  <p className="text-sm font-semibold text-emerald-300">{propOrder?.source || 'N/A'}</p>
                ) : (
                  <select 
                    value={source} 
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full bg-slate-900/80 backdrop-blur-sm border border-yellow-400/50 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                  >
                    <option value="">Select Source</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Website">Website</option>
                    <option value="Phone">Phone</option>
                    <option value="Walk-in">Walk-in</option>
                  </select>
                )}
              </div>
            </div>

            {/* Customer Selector - like address field */}
            {!isView && !propCustomer && (
              <div className="p-4 bg-slate-800/70 rounded-xl border-2 border-yellow-400/50">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-semibold text-slate-200">Customer</span>
                </div>
                <input
                  type="text"
                  placeholder="Type customer name or details..."
                  value={customerSearch}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCustomerSearch(value);
                    if (value) {
                      setCustomer(null); // Clear selection for new search
                    }
                  }}
                  className="w-full bg-slate-900/80 border border-yellow-400/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/70 relative z-10"
                />
                {customer && (
                  <div className="mt-2 p-3 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
                    <p className="text-sm font-semibold text-emerald-300">{customer.name}</p>
                    {customer.phone && <p className="text-xs text-emerald-200 mt-1">{customer.phone}</p>}
                  </div>
                )}
{filteredCustomers.length > 0 && customerSearch && !customer && (
                  <div className="absolute left-0 right-0 mt-1 bg-slate-800/95 border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-20 py-2">
                    {filteredCustomers.slice(0, 8).map((cust) => (
                      <button
                        key={cust.id}
                        onClick={() => {
                          setCustomer(cust);
                          setCustomerSearch(cust.name);
                        }}
                        className="w-full flex items-center gap-3 p-3 hover:bg-slate-700/50 rounded-lg transition-all text-left"
                      >
                        <img 
                          src={cust.avatar} 
                          alt={cust.name}
                          className="w-10 h-10 rounded-xl flex-shrink-0"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cust.name.split(' ').map(n => n[0]).join(''))}&background=1e293b&color=f8fafc&size=40&bold=true`;
                          }}
                        />
                        <div>
                          <p className="font-semibold text-white text-sm">{cust.name}</p>
                          {cust.phone && <p className="text-xs text-slate-400">{cust.phone}</p>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {customerSearch && !customer && (
                  <button
                    onClick={() => setShowCreateCustomerModal(true)}
                    className="mt-3 w-full px-4 py-3 bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all border border-purple-400/30 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create New Customer "{customerSearch}"
                  </button>
                )}
              </div>
            )}

            {/* Order Date */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Order Date
              </h4>
              <div className={`p-4 rounded-xl border border-white/10 ${isView ? 'bg-slate-800/30' : 'bg-slate-800/70 border-2 border-yellow-400/50 group hover:bg-slate-700/50 hover:border-yellow-400/70'}`}>
                {isView ? (
                  <p className="text-emerald-300 font-mono text-lg font-semibold">{propOrder?.date ? new Date(propOrder.date).toLocaleDateString('en-IN') : 'N/A'}</p>
                ) : (
                  <input
                    type="date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className="w-full bg-slate-900/80 backdrop-blur-sm border border-yellow-400/50 rounded-lg px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                  />
                )}
              </div>
            </div>

            {/* Products Section - matching Recent Orders structure */}
            {!isView && (
              <>
                <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Add Products ({selectedProducts.length})
                </h4>
                <div className="space-y-4 mb-8">
                  <input
                    placeholder="🔍 Search products..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600">
                    {filteredProducts.slice(0, 12).map(product => (
                      <button
                        key={product.id}
                        onClick={() => addProduct(product)}
                        className={`group p-3 rounded-xl border-2 text-sm font-medium flex flex-col items-center gap-1 cursor-pointer transition-all ${
                          selectedProducts.find(p => p.id === product.id)
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md'
                            : 'bg-slate-800/50 border-white/20 hover:bg-slate-700/50 hover:border-white/40 text-slate-200'
                        }`}
                      >
                        <div className="font-bold text-base">₹{product.price.toLocaleString()}</div>
                        <div className="text-xs opacity-90 line-clamp-1">{product.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Selected Products List - exact recent orders card style */}
            {selectedProducts.length > 0 && (
              <div>
                <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m-1-4H3m6 4h1m-1 4h1m-1-4H3m6 4h1m-1 4h1" />
                  </svg>
                  Selected Items ({itemsCount})
                </h4>
                <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600">
                  {selectedProducts.map((product) => {
                    const subtotal = product.price * product.qty * (1 - (product.discount || 0) / 100);
                    return (
                      <div key={product.id} className="p-4 bg-slate-800/30 hover:bg-slate-700/50 rounded-xl border border-white/10 transition-all group">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                          <div className="font-semibold text-white flex-shrink-0 min-w-[140px]">{product.name}</div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 text-sm">
                            <div className="text-slate-400">₹{product.price.toLocaleString()}</div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white min-w-[2rem] bg-slate-700 px-2 py-1 rounded text-center">{product.qty}</span>
                              {!isView && (
                                <>
                                  <button onClick={() => updateQty(product.id, -1)} className="w-10 h-10 bg-slate-700/50 hover:bg-slate-600 text-white font-bold rounded-lg flex items-center justify-center transition-all">-</button>
                                  <button onClick={() => updateQty(product.id, 1)} className="w-10 h-10 bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center justify-center transition-all">+</button>
                                </>
                              )}
                            </div>
                            {!isView && (
                              <div>
                                <input
                                  type="number"
                                  min="0" max="100"
                                  value={product.discount || 0}
                                  onChange={(e) => updateDiscount(product.id, e.target.value)}
                                  className="w-16 bg-slate-900/80 border border-yellow-400/50 rounded px-2 py-1 text-sm text-right"
                                  placeholder="0"
                                /> %
                              </div>
                            )}
                          </div>
                          <div className="text-right font-bold text-emerald-400 text-lg flex-shrink-0">
                            ₹{Math.round(subtotal).toLocaleString('en-IN')}
                          </div>
                          {!isView && (
                            <button onClick={() => removeProduct(product.id)} className="ml-auto text-red-400 hover:text-red-300 font-semibold text-sm">Remove</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {totalValue > 0 && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl mt-4 text-center">
                    <p className="text-lg font-bold text-emerald-300">Total: ₹{Math.round(totalValue).toLocaleString('en-IN')}</p>
                  </div>
                )}
              </div>
            )}

            {/* Stats Grid - EXACT copy */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Order Total</p>
                <p className="text-2xl font-bold text-white">₹{Math.round(totalValue).toLocaleString()}</p>
              </div>
              <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Total Items</p>
                <p className="text-2xl font-bold text-emerald-400">{itemsCount}</p>
              </div>
              <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Avg Price</p>
                <p className="text-2xl font-bold text-blue-400">₹{avgPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Nested Create Customer Modal - higher z-index */}
          {showCreateCustomerModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div 
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                onClick={() => setShowCreateCustomerModal(false)}
              />
              <CreateCustomerModal
                isOpen={true}
                onClose={() => setShowCreateCustomerModal(false)}
                onSaveCustomer={(newCust) => {
                  mockCustomers.push(newCust);
                  setCustomer(newCust);
                  setCustomerSearch(newCust.name);
                  setShowCreateCustomerModal(false);
                }}
              />
            </div>
          )}

          {/* Footer - EXACT copy structure */}
          <div className="p-6 border-t border-white/10 bg-slate-900/95 backdrop-blur-sm sticky bottom-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={onClose}
                className="flex-1 px-6 py-4 bg-slate-700/50 hover:bg-slate-600 text-slate-200 font-semibold rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              {!isView ? (
                <button 
                  onClick={handleSave}
                  disabled={!orderDate || selectedProducts.length === 0 || !customer}
                  className="flex-1 px-6 py-4 bg-emerald-600/80 hover:bg-emerald-500 disabled:bg-emerald-700/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all border border-emerald-400/30 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/25"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {isEdit ? 'Update Order' : 'Create Order'}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrderModal;

