import React, { useState } from 'react';

const CreateProductModal = ({ 
  isOpen, 
  onClose, 
  onSaveProduct 
}) => {
  if (!isOpen) return null;

  const [newProduct, setNewProduct] = useState({
    img: '',
    name: '',
    sku: '',
    price: '',
    quantity: '',
    category: 'Electronics',
    desc: '',
    tags: ''
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('/api/placeholder/400/250');

  const categories = ['Electronics', 'Home', 'Apparel', 'Stationery'];

  const handleImageChange = (url) => {
    setNewProduct(prev => ({ ...prev, img: url }));
    if (url) {
      setImagePreview(url);
    } else {
      setImagePreview('/api/placeholder/400/250');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newProduct.name?.trim()) newErrors.name = 'Name is required';
    if (!newProduct.sku?.trim()) newErrors.sku = 'SKU is required';
    if (!newProduct.price || isNaN(newProduct.price) || parseFloat(newProduct.price) <= 0) newErrors.price = 'Valid price > 0 required';
    if (!newProduct.quantity || isNaN(newProduct.quantity) || parseInt(newProduct.quantity) < 0) newErrors.quantity = 'Valid stock >= 0 required';
    if (!newProduct.img?.trim()) newErrors.img = 'Image URL required';
    if (!newProduct.category) newErrors.category = 'Category required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const productData = {
      id: Date.now(),
      img: newProduct.img,
      name: newProduct.name.trim(),
      sku: newProduct.sku.trim(),
      price: `$${parseFloat(newProduct.price).toFixed(2)}`,
      quantity: parseInt(newProduct.quantity),
      category: newProduct.category,
      total_sold: 0,
      desc: newProduct.desc.trim(),
      tags: newProduct.tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
    };

    onSaveProduct(productData);
    console.log('✅ New product created:', productData);
    alert('Product created successfully!');
  };

  const getStockStatus = (qty) => {
    const num = parseInt(qty);
    if (num === 0) return 'Out of Stock';
    if (num < 10) return 'Low Stock';
    if (num < 30) return 'Medium';
    return 'In Stock';
  };

  const stockStatusColor = getStockStatus(newProduct.quantity);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-[60] p-4 md:p-8 animate-in slide-in-from-bottom-4 duration-300 fade-in-0">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-4xl h-[85vh] max-h-[95vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-6 lg:p-8 pb-4 border-b border-white/10 sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10 flex-shrink-0">
            <div className="flex items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <img 
                  src={imagePreview} 
                  alt={newProduct.name || 'New Product'}
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl ring-2 ring-white/20 shadow-lg flex-shrink-0 hover:scale-105 transition-transform duration-200 object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/96/96';
                  }}
                />
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent leading-tight">
                    New Product
                  </h2>
                  <p className="text-sm lg:text-base text-slate-400 mt-1 font-medium">
                    Fill all fields to create a new product listing
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

          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900">
            {/* Form Fields - 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  className={`w-full bg-slate-900/80 backdrop-blur-sm border rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? 'border-red-400/50 ring-red-400/30' : 'border-white/10 focus:border-emerald-400/50 focus:ring-emerald-400/50'
                  }`}
                  placeholder="Wireless Keyboard"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={newProduct.sku}
                  onChange={handleChange}
                  className={`w-full bg-slate-900/80 backdrop-blur-sm border rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:ring-2 transition-all ${
                    errors.sku ? 'border-red-400/50 ring-red-400/30' : 'border-white/10 focus:border-blue-400/50 focus:ring-blue-400/50'
                  }`}
                  placeholder="STK-001"
                />
                {errors.sku && <p className="text-red-400 text-sm mt-1">{errors.sku}</p>}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2-0 2 3 .895 3 2-.895 2-2 2 1.343 0 2-2V8z" />
                  </svg>
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  className={`w-full bg-slate-900/80 backdrop-blur-sm border rounded-xl px-4 py-3 text-white font-mono text-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.price ? 'border-red-400/50 ring-red-400/30' : 'border-white/10 focus:border-emerald-400/50 focus:ring-emerald-400/50'
                  }`}
                  placeholder="49.99"
                />
                {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Stock
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={handleChange}
                  min="0"
                  className={`w-full bg-slate-900/80 backdrop-blur-sm border rounded-xl px-4 py-3 text-white font-mono text-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.quantity ? 'border-red-400/50 ring-red-400/30' : 'border-white/10 focus:border-orange-400/50 focus:ring-orange-400/50'
                  }`}
                  placeholder="25"
                />
                {errors.quantity && <p className="text-red-400 text-sm mt-1">{errors.quantity}</p>}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V9a4 4 0 014-4z" />
                </svg>
                Category
              </label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                className={`w-full bg-slate-900/80 backdrop-blur-sm border rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:ring-2 transition-all ${
                  errors.category ? 'border-red-400/50 ring-red-400/30' : 'border-white/10 focus:border-purple-400/50 focus:ring-purple-400/50'
                }`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Image URL
              </label>
              <input
                type="url"
                name="img"
                value={newProduct.img}
                onChange={(e) => {
                  handleChange(e);
                  handleImageChange(e.target.value);
                }}
                className={`w-full bg-slate-900/80 backdrop-blur-sm border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.img ? 'border-red-400/50 ring-red-400/30' : 'border-white/10 focus:border-indigo-400/50 focus:ring-indigo-400/50'
                }`}
                placeholder="https://placehold.co/400x250/1a1a1a/white/Product?font=roboto"
              />
              {errors.img && <p className="text-red-400 text-sm mt-1">{errors.img}</p>}
              <div className="mt-3 p-2 bg-slate-800/50 rounded-xl border border-white/10">
                <img 
                  src={imagePreview} 
                  alt="Preview"
                  className="w-full h-32 md:h-40 object-cover rounded-xl shadow-lg"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/250';
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Description
              </label>
              <textarea
                name="desc"
                value={newProduct.desc}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-900/80 backdrop-blur-sm border rounded-xl px-4 py-3 text-white text-sm leading-relaxed focus:outline-none focus:ring-2 transition-all resize-vertical border-white/10 focus:border-slate-400/50 focus:ring-slate-400/50"
                placeholder="Enter product description..."
              />
            </div>

            {/* Tags */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5.25A2.25 2.25 0 0114.25 5.5v.75a3 3 0 013 3 .75.75 0 00.75.75h.25A2.25 2.25 0 0120 13.5v3.75A2.25 2.25 0 0117.75 19h-9.5A2.25 2.25 0 016 16.75v-3.75A2.25 2.25 0 018.25 11h.75a3 3 0 013-3V5.5A2.25 2.25 0 0114.25 3H13z" />
                </svg>
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={newProduct.tags}
                onChange={handleChange}
                className="w-full bg-slate-900/80 backdrop-blur-sm border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all border-white/10 focus:border-rose-400/50 focus:ring-rose-400/50"
                placeholder="new, popular, wireless"
              />
              <p className="text-xs text-slate-500 mt-1">e.g. new, bestseller, premium, wireless</p>
            </div>

            {/* Preview Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Price</p>
                <p className="text-2xl font-bold text-emerald-400">${newProduct.price || '0.00'}</p>
              </div>
              <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Stock Status</p>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  stockStatusColor === 'Out of Stock' ? 'bg-red-500/20 text-red-300 border-red-400/30' :
                  stockStatusColor === 'Low Stock' ? 'bg-orange-500/20 text-orange-300 border-orange-400/30' :
                  stockStatusColor === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30' :
                  'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                }`}>
                  {stockStatusColor}
                </span>
              </div>
              <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Category</p>
                <p className="text-xl font-bold text-purple-400">{newProduct.category}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
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
                onClick={handleSave}
                disabled={!newProduct.name || !newProduct.sku || !newProduct.price || !newProduct.quantity || !newProduct.img}
                className="flex-1 px-6 py-4 bg-emerald-600/80 hover:bg-emerald-500 disabled:bg-emerald-700/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all border border-emerald-400/30 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/25"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProductModal;

