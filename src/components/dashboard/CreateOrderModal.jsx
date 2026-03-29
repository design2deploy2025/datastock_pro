import React from 'react';

const CreateOrderModal = ({ customer, isOpen, onClose, onCreateOrder, newOrder, setNewOrder, errors, calculateTotal, handleNewOrderChange }) => {
  if (!isOpen || !customer) return null;

const totalNum = calculateTotal() ? parseFloat(calculateTotal().replace(/,/g, '')) || 0 : 0;

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
                  src={customer.avatar} 
                  alt={customer.name}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl ring-2 ring-white/20 shadow-lg flex-shrink-0 hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name.split(' ').map(n => n[0]).join(''))}&background=475569&color=f8fafc&size=128&bold=true`;
                  }}
                />
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent leading-tight">
                    New Order
                  </h2>
                  <p className="text-sm lg:text-base text-slate-400 mt-1 font-medium">
                    For {customer.name}
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
            {/* Contact Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Instagram */}
              <div className="group p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl border border-white/10 transition-all cursor-pointer" onClick={async () => {
                await navigator.clipboard.writeText(customer.instagram);
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-pink-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.921.146-6.462 2.556-6.61 6.611-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.148 4.955 2.683 6.611 6.61 6.61 1.28.059 1.688.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.924-.146 6.464-2.541 6.61-6.61.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.146-4.92-2.556-6.61-6.611-6.61-1.28-.059-1.689-.073-4.948-.073z"/>
                    <path d="M12 5.839c-2.847 0-5.158 2.311-5.158 5.158s2.311 5.158 5.158 5.158 5.158-2.311 5.158-5.158-2.311-5.158-5.158-5.158z"/>
                    <path d="M15.663 11.998h-1.68v-1.679h2.928v1.679h-1.248v3.553h-1.001V11.998z"/>
                  </svg>
                  <span className="font-semibold text-slate-200 group-hover:text-pink-400 transition-colors text-sm">Instagram</span>
                </div>
                <p className="text-slate-300 font-mono text-sm break-all">{customer.instagram}</p>
              </div>
              {/* Phone */}
              <div className="group p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl border border-white/10 transition-all cursor-pointer" onClick={async () => {
                await navigator.clipboard.writeText(customer.phone);
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors text-sm">Phone</span>
                </div>
                <p className="text-slate-300 font-mono text-sm">{customer.phone}</p>
              </div>
              {/* Address */}
              <div className="p-4 bg-slate-800/30 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-semibold text-slate-200 text-sm">Address</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{customer.address}</p>
              </div>
              {/* LTV */}
              <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 border border-emerald-400/30 rounded-xl text-center">
                <p className="text-emerald-300 text-xs uppercase tracking-wide font-medium">Lifetime Value</p>
                <p className="text-xl font-bold text-white mt-1">{customer.totalOrdersValue}</p>
                <p className="text-emerald-300 text-xs mt-1">High value customer</p>
              </div>
            </div>

            {/* Order Form */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Order Details
              </h4>
              <div className="space-y-4">
              {/* Order Details Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Order Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newOrder.date || ''}
                    onChange={handleNewOrderChange}
                    className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                </div>

                {/* Order ID with generate */}
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Order ID</label>
                    <input
                      type="text"
                      name="orderId"
                      placeholder="ORD-20241101-001"
                      value={newOrder.orderId || ''}
                      onChange={handleNewOrderChange}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      const id = `ORD-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random()*999).toString().padStart(3,'0')}`;
                      handleNewOrderChange({target: {name: 'orderId', value: id}});
                    }}
                    className="px-6 py-3 bg-emerald-600/80 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all border border-emerald-400/30 shadow-lg hover:shadow-emerald-500/25 whitespace-nowrap"
                  >
                    Generate
                  </button>
                </div>

                {/* Row selects */}
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

              {/* Products Selector */}
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

              {/* Selected Products Table */}
              {selectedProducts.length > 0 && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-300">Selected Products ({selectedProducts.length})</label>
                  <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500">
                    {selectedProducts.map((sp) => {
                      const subtotal = sp.price * sp.qty * (1 - sp.discount / 100);
                      return (
                        <div key={sp.id} className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-5 items-center gap-4">
                          <div className="font-semibold text-white md:col-span-2">{sp.name}</div>
                          <div className="text-slate-300">₹{sp.price.toLocaleString()}</div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(sp.id, -1)} className="w-10 h-10 bg-slate-700/50 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white font-bold transition-all">-</button>
                            <span className="font-bold text-white min-w-[2rem] text-center">{sp.qty}</span>
                            <button onClick={() => updateQty(sp.id, 1)} className="w-10 h-10 bg-emerald-600/80 hover:bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold transition-all">+</button>
                          </div>
                          <div className="flex flex-col items-center gap-1 min-w-[80px]">
                            <span className="text-xs text-slate-400 font-medium tracking-wide">Discount</span>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                value={sp.discount}
                                onChange={(e) => updateDiscount(sp.id, e.target.value)}
                                className="w-16 bg-slate-700/50 border border-white/20 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
                                placeholder="0"
                              />
                              <span className="text-slate-400 text-xs">%</span>
                            </div>
                          </div>
                          <div className="text-right font-bold text-emerald-400">₹{subtotal.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                          <button onClick={() => removeProduct(sp.id)} className="ml-auto text-red-400 hover:text-red-300 font-semibold text-sm md:col-span-1">Remove</button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
                    <p className="text-sm text-slate-300">Order Total: ₹{calculateSelectedTotal()}</p>
                  </div>
                </div>
              )}
            </div>
            </div>

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
              <button 
                onClick={() => {
                  // Update newOrder with selected data before create
                  setNewOrder(prev => ({
                    ...prev,
                    items: JSON.stringify(selectedProducts.map(sp => `${sp.name} x ${sp.qty} @ ₹${sp.price} (-${sp.discount}%)`)),
                    qty: selectedProducts.reduce((sum, sp) => sum + sp.qty, 0),
                    unitPrice: selectedProducts.length > 0 ? selectedProducts[0].price : '',
                    products: selectedProducts // new field
                  }));
                  onCreateOrder();
                }}
                className="flex-1 px-6 py-4 bg-emerald-600/80 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all border border-emerald-400/30 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/25"
                disabled={!newOrder.date || selectedProducts.length === 0}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrderModal;

