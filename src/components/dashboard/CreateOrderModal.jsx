import React from 'react';

const CreateOrderModal = ({ 
  mode = 'create', 
  order = null, 
  customerName = '', 
  isOpen, 
  onClose, 
  onSaveOrder, 
  newOrder, 
  setNewOrder, 
  errors, 
  calculateTotal, 
  handleNewOrderChange 
}) => {
  if (!isOpen) return null;

  const isView = mode === 'view';
  const isEdit = mode === 'edit';

  // Mock products data for UI
  const products = [
    { id: 1, name: 'T-Shirt', price: 1400 },
    { id: 2, name: 'Hoodie', price: 2800 },
    { id: 3, name: 'Jeans', price: 2725 },
    { id: 4, name: 'Sneakers', price: 1750 },
    { id: 5, name: 'Cap', price: 700 },
    { id: 6, name: 'Dress', price: 2050 },
    { id: 7, name: 'Skirt', price: 2040 },
    { id: 8, name: 'Jacket', price: 4100 },
    { id: 9, name: 'Shirt', price: 1050 },
    { id: 10, name: 'Belt', price: 630 },
    { id: 11, name: 'Wallet', price: 845 },
    { id: 12, name: 'Backpack', price: 2800 },
    { id: 13, name: 'Bag', price: 1150 },
    { id: 14, name: 'Scarf', price: 668 },
    { id: 15, name: 'Jewelry Set', price: 1500 }
  ];

  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState(products);
  const [productSearch, setProductSearch] = React.useState('');

  // Prefill form from order data for edit mode
  React.useEffect(() => {
    if (isEdit && order) {
      setNewOrder({
        date: order.date || '',
        orderId: order.displayId || '',
        paymentType: '',
        paymentStatus: order.paymentStatus || '',
        orderStatus: order.status || '',
        source: order.source || '',
        items: '',
        qty: '',
        unitPrice: ''
      });
      setSelectedProducts(order.products || []);
    }
  }, [isEdit, order, setNewOrder]);

  // Filter products
  React.useEffect(() => {
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(productSearch.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [productSearch]);

  // Calculate total from selected
  const calculateSelectedTotal = () => {
    const total = selectedProducts.reduce((sum, sp) => {
      const subtotal = sp.price * sp.qty * (1 - sp.discount / 100);
      return sum + subtotal;
    }, 0);
    return total.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  // Add product
  const addProduct = (product) => {
    if (selectedProducts.find(sp => sp.id === product.id)) return;
    setSelectedProducts([...selectedProducts, { ...product, qty: 1, discount: 0 }]);
  };

  // Update qty
  const updateQty = (id, delta) => {
    setSelectedProducts(prev => prev.map(sp => 
      sp.id === id ? { ...sp, qty: Math.max(1, sp.qty + delta) } : sp
    ));
  };

  // Update discount
  const updateDiscount = (id, discount) => {
    setSelectedProducts(prev => prev.map(sp => 
      sp.id === id ? { ...sp, discount: Math.max(0, Math.min(100, parseFloat(discount) || 0)) } : sp
    ));
  };

  // Remove product
  const removeProduct = (id) => {
    setSelectedProducts(prev => prev.filter(sp => sp.id !== id));
  };

  // Items count
  const itemsCount = selectedProducts.reduce((sum, sp) => sum + sp.qty, 0);
  const avgPrice = itemsCount > 0 ? (parseFloat(calculateSelectedTotal().replace(/,/g, '')) / itemsCount).toFixed(0) : 0;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-8 animate-in slide-in-from-bottom-4 duration-300 fade-in-0">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-6xl h-[85vh] max-h-[95vh] flex flex-col">
          {/* Header */}
          <div className="p-6 lg:p-8 pb-4 border-b border-white/10 sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10 flex-shrink-0">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
              <div className="flex items-center gap-4 lg:gap-6">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent((order?.customerName || customerName).split(' ').map(n => n[0]).join(''))}&background=1e293b&color=f8fafc&size=128&bold=true`}
                  alt={order?.customerName || customerName || 'Customer'}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl ring-2 ring-white/20 shadow-lg flex-shrink-0"
                />
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent leading-tight">
                    {isView ? 'Order Details' : isEdit ? 'Edit Order' : 'New Order'}
                    {order && !isView && <span className="text-emerald-400 font-mono text-sm ml-2">#{order.displayId}</span>}
                  </h2>
                  <p className="text-sm lg:text-base text-slate-400 mt-1 font-medium">
                    {order?.customerName || customerName || 'Customer'}
                    {order && <span className="text-slate-500"> • {order.date} • {order.value}</span>}
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

          <div className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500">
            {/* Status Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Order ID */}
              <div className="p-4 bg-slate-800/30 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span className="font-semibold text-slate-200 text-sm">Order ID</span>
                </div>
                <p className="text-emerald-300 font-mono text-sm font-semibold">{order?.displayId || newOrder.orderId || 'N/A'}</p>
              </div>
              {/* Status */}
              <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-white/10 text-center">
                <p className="text-xs uppercase tracking-wide font-medium text-slate-400 mb-1">Status</p>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order?.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' :
                  order?.status === 'Shipped' ? 'bg-blue-500/20 text-blue-300 border-blue-400/30' :
                  order?.status === 'Cancelled' ? 'bg-red-500/20 text-red-300 border-red-400/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                } border`}>
                  {order?.status || newOrder.orderStatus || 'Pending'}
                </span>
              </div>
              {/* Payment */}
              <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-white/10 text-center">
                <p className="text-xs uppercase tracking-wide font-medium text-slate-400 mb-1">Payment</p>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order?.paymentStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' :
                  order?.paymentStatus === 'Refunded' ? 'bg-red-500/20 text-red-300 border-red-400/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                } border`}>
                  {order?.paymentStatus || newOrder.paymentStatus || 'Pending'}
                </span>
              </div>
              {/* Source */}
              <div className="p-4 bg-slate-800/30 rounded-xl border border-white/10 text-center">
                <p className="text-xs uppercase tracking-wide font-medium text-slate-400 mb-1">Source</p>
                <p className="text-sm font-semibold text-emerald-300">{order?.source || newOrder.source || 'N/A'}</p>
              </div>
            </div>

            {/* Order Form */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {isView ? 'Order Summary' : 'Order Details'}
              </h4>
              <div className="space-y-6">
                {/* Order Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Order Date</label>
                  {isView ? (
                    <div className="p-4 bg-slate-800/30 rounded-xl border border-white/10 font-mono text-emerald-300">
                      {order?.date ? new Date(order.date).toLocaleDateString('en-IN') : 'N/A'}
                    </div>
                  ) : (
                    <input
                      type="date"
                      name="date"
                      value={newOrder.date || ''}
                      onChange={handleNewOrderChange}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                  )}
                </div>

                {/* Row selects for edit/create */}
                {(!isView) && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Payment Type</label>
                        <select name="paymentType" value={newOrder.paymentType || ''} onChange={handleNewOrderChange} className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all">
                          <option value="">Select Type</option>
                          <option value="Cash">Cash</option>
                          <option value="Card">Card</option>
                          <option value="UPI">UPI</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Payment Status</label>
                        <select name="paymentStatus" value={newOrder.paymentStatus || ''} onChange={handleNewOrderChange} className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all">
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Failed">Failed</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Order Status</label>
                        <select name="orderStatus" value={newOrder.orderStatus || ''} onChange={handleNewOrderChange} className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all">
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Source</label>
                      <select name="source" value={newOrder.source || ''} onChange={handleNewOrderChange} className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all">
                        <option value="">Select Source</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Website">Website</option>
                        <option value="Phone">Phone</option>
                        <option value="Walk-in">Walk-in</option>
                      </select>
                    </div>
                  </div>
                )}
              {isView && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-white/10">
                    <label className="block text-xs font-medium text-slate-400 mb-2">Payment Type</label>
                    <p className="text-sm text-slate-200 font-semibold">N/A</p>
                  </div>
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-white/10">
                    <label className="block text-xs font-medium text-slate-400 mb-2">Payment Status</label>
                    <p className="text-sm font-semibold">{order?.paymentStatus || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-white/10">
                    <label className="block text-xs font-medium text-slate-400 mb-2">Order Status</label>
                    <p className="text-sm font-semibold">{order?.status || 'N/A'}</p>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Source</label>
                {isView ? (
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-white/10">
                    <p className="text-sm font-semibold text-emerald-300">{order?.source || 'N/A'}</p>
                  </div>
                ) : (
                  <select name="source" value={newOrder.source || ''} onChange={handleNewOrderChange} className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all">
                    <option value="">Select Source</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Website">Website</option>
                    <option value="Phone">Phone</option>
                    <option value="Walk-in">Walk-in</option>
                  </select>
                )}
              </div>
              </div>

              {/* Products Selector for create/edit */}
              {!isView && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Select Products</label>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all mb-4"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => addProduct(product)}
                        className={`p-3 rounded-xl border-2 transition-all text-sm font-medium flex flex-col items-center gap-1 ${
                          selectedProducts.find(sp => sp.id === product.id)
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                            : 'bg-slate-800/50 border-white/20 hover:bg-slate-700/50 hover:border-white/40 text-slate-200'
                        }`}
                      >
                        <div className="font-bold text-base">₹{product.price.toLocaleString()}</div>
                        <div className="text-xs opacity-90">{product.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Products Table */}
              {selectedProducts.length > 0 && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-300">
                    Products ({selectedProducts.length} items, {itemsCount} qty)
                  </label>
                  <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500">
                    {selectedProducts.map((sp) => {
                      const subtotal = sp.price * sp.qty * (1 - sp.discount / 100);
                      return (
                        <div key={sp.id} className={`bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-5 items-center gap-4 ${isView ? 'opacity-75 cursor-default' : ''}`}>
                          <div className="font-semibold text-white md:col-span-2">{sp.name}</div>
                          <div className="text-slate-300">₹{sp.price.toLocaleString()}</div>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold text-white min-w-[2rem] text-center ${isView ? 'bg-slate-700/50 px-2 py-1 rounded' : ''}`}>
                              {sp.qty}
                            </span>
                            {!isView && (
                              <>
                                <button onClick={() => updateQty(sp.id, -1)} className="w-10 h-10 bg-slate-700/50 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white font-bold transition-all">-</button>
                                <button onClick={() => updateQty(sp.id, 1)} className="w-10 h-10 bg-emerald-600/80 hover:bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold transition-all">+</button>
                              </>
                            )}
                          </div>
                          <div className="flex flex-col items-center gap-1 min-w-[80px]">
                            <span className="text-xs text-slate-400 font-medium tracking-wide">Discount</span>
                            <span className={`text-sm font-semibold ${isView ? 'text-slate-300' : ''}`}>
                              {sp.discount}%
                            </span>
                          </div>
                          <div className="text-right font-bold text-emerald-400">
                            ₹{subtotal.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                          </div>
                          {!isView && (
                            <button onClick={() => removeProduct(sp.id)} className="ml-auto text-red-400 hover:text-red-300 font-semibold text-sm md:col-span-1">Remove</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
                    <p className="text-sm text-slate-300 font-semibold">Total: ₹{calculateSelectedTotal()}</p>
                  </div>
                </div>
              )}
              {isView && selectedProducts.length === 0 && order && (
                <div className="text-center py-12 text-slate-400">
                  No detailed products data available.
                </div>
              )}
            </div>
          </div>

          {/* Products Section */}
          {!isView && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Products</label>
              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all mb-4"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addProduct(product)}
                    className={`p-3 rounded-xl border-2 transition-all text-sm font-medium flex flex-col items-center gap-1 ${
                      selectedProducts.find(sp => sp.id === product.id)
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                        : 'bg-slate-800/50 border-white/20 hover:bg-slate-700/50 hover:border-white/40 text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-base">₹{product.price.toLocaleString()}</div>
                    <div className="text-xs opacity-90">{product.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Products Table */}
          {selectedProducts.length > 0 && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">
                Products ({selectedProducts.length} items, {itemsCount} qty)
              </label>
              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500">
                {selectedProducts.map((sp) => {
                  const subtotal = sp.price * sp.qty * (1 - sp.discount / 100);
                  return (
                    <div key={sp.id} className={`bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-5 items-center gap-4 ${isView ? 'opacity-75 cursor-default' : ''}`}>
                      <div className="font-semibold text-white md:col-span-2">{sp.name}</div>
                      <div className="text-slate-300">₹{sp.price.toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-white min-w-[2rem] text-center ${isView ? 'bg-slate-700/50 px-2 py-1 rounded' : ''}`}>
                          {sp.qty}
                        </span>
                        {!isView && (
                          <>
                            <button onClick={() => updateQty(sp.id, -1)} className="w-10 h-10 bg-slate-700/50 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white font-bold transition-all">-</button>
                            <button onClick={() => updateQty(sp.id, 1)} className="w-10 h-10 bg-emerald-600/80 hover:bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold transition-all">+</button>
                          </>
                        )}
                      </div>
                      <div className="flex flex-col items-center gap-1 min-w-[80px]">
                        <span className="text-xs text-slate-400 font-medium tracking-wide">Discount</span>
                        <span className={`text-sm font-semibold ${isView ? 'text-slate-300' : ''}`}>
                          {sp.discount}%
                        </span>
                      </div>
                      <div className="text-right font-bold text-emerald-400">
                        ₹{subtotal.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                      </div>
                      {!isView && (
                        <button onClick={() => removeProduct(sp.id)} className="ml-auto text-red-400 hover:text-red-300 font-semibold text-sm md:col-span-1">Remove</button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
                <p className="text-sm text-slate-300 font-semibold">Total: ₹{calculateSelectedTotal()}</p>
              </div>
            </div>
          )}
          {isView && selectedProducts.length === 0 && order && (
            <div className="text-center py-12 text-slate-400">
              No detailed products data available.
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Order Total</p>
                <p className="text-2xl font-bold text-white">₹{calculateSelectedTotal()}</p>
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

          {/* Footer Actions */}
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
              {isView ? (
                <>
                  <button 
                    onClick={() => {
                      // Close and let parent reopen in edit mode
                      onClose();
                    }}
                    className="flex-1 px-6 py-4 bg-blue-600/80 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all border border-blue-400/30 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Order
                  </button>
                  <button 
                    onClick={() => console.log('Print invoice:', order?.invoiceUrl)}
                    className="flex-1 px-6 py-4 bg-purple-600/80 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all border border-purple-400/30 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v.5" />
                    </svg>
                    Print Invoice
                  </button>
                </>
              ) : (
              <button 
                onClick={() => {
                  // Update newOrder with selected data before create/edit
                  const updatedData = {
                    ...newOrder,
                    products: selectedProducts,
                    totalValue: calculateSelectedTotal(),
                    itemsCount,
                    avgPrice
                  };
                  setNewOrder(prev => ({
                    ...prev,
                    items: JSON.stringify(selectedProducts.map(sp => `${sp.name} x ${sp.qty} @ ₹${sp.price} (-${sp.discount}%)`)),
                    qty: selectedProducts.reduce((sum, sp) => sum + sp.qty, 0),
                    unitPrice: selectedProducts.length > 0 ? selectedProducts[0].price : ''
                  }));
                  onSaveOrder(updatedData);
                }}
                className="flex-1 px-6 py-4 bg-emerald-600/80 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all border border-emerald-400/30 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/25"
                disabled={!newOrder.date || selectedProducts.length === 0}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {isEdit ? 'Update Order' : 'Create Order'}
              </button>
              )}
            </div>
          </div>
        </div>
    </>
  );
};

export default CreateOrderModal;

