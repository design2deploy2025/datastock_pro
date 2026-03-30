import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreateProductModal from '../../components/dashboard/CreateProductModal';

const Products = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [showProductModal, setShowProductModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Dummy products data - UI only
  const [products, setProducts] = useState([
    {
      id: 1,
      img: 'https://placehold.co/400x250/1a1a1a/white/Wireless%20Keyboard?font=roboto',
      name: 'Wireless Keyboard',
      sku: 'STK-001',
      price: '$49.99',
      quantity: 25,
      category: 'Electronics',
      status: 'Active',
      total_sold: 150,
      desc: 'Ergonomic wireless keyboard with multi-device connectivity and long battery life.',
      tags: ['new', 'popular', 'wireless']
    },
    {
      id: 2,
      img: 'https://placehold.co/400x250/1a1a1a/white/Mouse?font=roboto',
      name: 'Gaming Mouse',
      sku: 'STK-002',
      price: '$79.99',
      quantity: 12,
      category: 'Electronics',
      status: 'Active',
      total_sold: 320,
      desc: 'High-performance gaming mouse with 12k DPI sensor and customizable RGB lighting.',
      tags: ['gaming', 'bestseller']
    },
    {
      id: 3,
      img: 'https://placehold.co/400x250/1a1a1a/white/Coffee%20Mug?font=roboto',
      name: 'Ceramic Coffee Mug',
      sku: 'STK-003',
      price: '$12.99',
      quantity: 48,
      category: 'Home',
      status: 'Active',
      total_sold: 89,
      desc: 'Premium ceramic mug with comfortable grip and dishwasher-safe design.',
      tags: ['home', 'gift']
    },
    {
      id: 4,
      img: 'https://placehold.co/400x250/1a1a1a/white/Headphones?font=roboto',
      name: 'Noise-Cancelling Headphones',
      sku: 'STK-004',
      price: '$199.99',
      quantity: 8,
      category: 'Electronics',
      status: 'Active',
      total_sold: 45,
      desc: 'Premium over-ear headphones with active noise cancellation and 30hr battery.',
      tags: ['premium', 'audio']
    },
    {
      id: 5,
      img: 'https://placehold.co/400x250/1a1a1a/white/T-Shirt?font=roboto',
      name: 'Cotton T-Shirt',
      sku: 'STK-005',
      price: '$24.99',
      quantity: 35,
      category: 'Apparel',
      status: 'Active',
      total_sold: 210,
      desc: 'Soft 100% cotton t-shirt available in multiple sizes and colors.',
      tags: ['apparel', 'comfort']
    },
    {
      id: 6,
      img: 'https://placehold.co/400x250/1a1a1a/white/Notebook?font=roboto',
      name: 'Spiral Notebook',
      sku: 'STK-006',
      price: '$8.99',
      quantity: 62,
      category: 'Stationery',
      status: 'Active',
      total_sold: 67,
      desc: 'A5 spiral-bound notebook with 100 ruled pages and durable cover.',
      tags: ['stationery', 'office']
    },
    {
      id: 7,
      img: 'https://placehold.co/400x250/1a1a1a/white/USB%20Drive?font=roboto',
      name: '128GB USB Drive',
      sku: 'STK-007',
      price: '$29.99',
      quantity: 18,
      category: 'Electronics',
      status: 'Active',
      total_sold: 112,
      desc: 'High-speed USB 3.0 flash drive with metal casing for durability.',
      tags: ['storage', 'fast']
    },
    {
      id: 8,
      img: 'https://placehold.co/400x250/1a1a1a/white/Water%20Bottle?font=roboto',
      name: 'Stainless Steel Water Bottle',
      sku: 'STK-008',
      price: '$34.99',
      quantity: 29,
      category: 'Home',
      status: 'Active',
      total_sold: 95,
      desc: 'Insulated 500ml stainless steel bottle keeps drinks cold for 24hrs.',
      tags: ['eco-friendly', 'insulated']
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'Draft': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'Out of Stock': return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'Discontinued': return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
    }
  };

  const ProductCard = ({ img, name, sku, price, quantity, category, status, total_sold, desc, tags }) => (
    <div className="group bg-slate-900/80 border border-slate-800/50 rounded-2xl p-6 hover:bg-slate-900 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-[1.02] transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="mb-6">
        <img 
          src={img} 
          alt={name}
          className="w-full h-48 md:h-52 object-cover rounded-xl group-hover:brightness-110 transition-all duration-300 shadow-lg"
        />
      </div>
      
      {/* Header: Name, SKU, Price */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-1 leading-tight">{name}</h3>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm bg-slate-800/60 text-slate-400 px-3 py-1 rounded-lg font-mono border border-slate-700/50">
          SKU: {sku}
        </span>
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
        <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 rounded-xl text-white font-bold text-lg shadow-md shadow-emerald-500/25 hover:shadow-emerald-400/40 hover:-translate-y-0.5 transition-all">
          {price}
        </span>
      </div>
      
      {/* Stats Row: 3 columns */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-slate-800/50 rounded-xl">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-1 bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="text-lg font-bold text-white">{quantity}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide">Stock</div>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-1 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V9a4 4 0 014-4z" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-white truncate">{category}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide">Category</div>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-1 bg-orange-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="text-lg font-bold text-white">{total_sold}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide">Sold</div>
        </div>
      </div>
      
      <p className="text-sm text-slate-300 mb-4 line-clamp-2 leading-relaxed">{desc}</p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span 
            key={idx}
            className="px-3 py-1 bg-slate-700/50 hover:bg-emerald-500/20 text-xs font-medium text-slate-300 rounded-full border border-slate-600/50 hover:border-emerald-400/50 transition-all group-hover:scale-105"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Sidebar />
      <main className="ml-0 md:ml-64 p-8 md:p-12 flex flex-col min-h-screen">
        <div className="flex-1">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-4">
              Products
            </h1>
            <p className="text-xl text-gray-400 mb-6 max-w-2xl">
              Manage your products and inventory with ease. View details and stock status.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:backdrop-blur-sm transition-all"
              />
              <button 
                onClick={() => setShowProductModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                + Add Product
              </button>
            </div>

            {showProductModal && (
              <CreateProductModal 
                isOpen={showProductModal}
                onClose={() => setShowProductModal(false)}
                onSaveProduct={(newProduct) => {
                  setProducts(prev => [newProduct, ...prev]);
                  setShowProductModal(false);
                  alert(`✅ Product "${newProduct.name}" added successfully!`);
                  console.log('New product added:', newProduct);
                }}
              />
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
