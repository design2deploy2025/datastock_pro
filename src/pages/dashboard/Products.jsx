import React, { useState, useMemo } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreateProductModal from '../../components/dashboard/CreateProductModal';

const Products = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [minStock, setMinStock] = useState('');
  const [maxStock, setMaxStock] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? { ...updatedProduct } : p));
    setEditingProduct(null);
    setShowProductModal(false);
    alert(`✅ Product "${updatedProduct.name}" updated successfully!`);
    console.log('Product updated:', updatedProduct);
  };

  // Dummy products data - UI only (moved up to avoid TDZ)
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

  // Get unique categories and statuses
  const categories = Array.from(new Set(products.map(p => p.category)));
  const statuses = Array.from(new Set(products.map(p => p.status)));

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      // Search filter
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

      // Status filter
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;

      // Stock range filter
      const stock = product.quantity;
      const min = minStock ? parseInt(minStock) : 0;
      const max = maxStock ? parseInt(maxStock) : Infinity;
      const matchesStock = stock >= min && stock <= max;

      return matchesSearch && matchesCategory && matchesStatus && matchesStock;
    });

    // Sort
    result.sort((a, b) => {
      let aVal, bVal;
      switch(sortBy) {
        case 'name': aVal = a.name; bVal = b.name; break;
        case 'sku': aVal = a.sku; bVal = b.sku; break;
        case 'price': 
          aVal = parseFloat(a.price.replace(/[^\d.]/g, '')); 
          bVal = parseFloat(b.price.replace(/[^\d.]/g, '')); 
          break;
        case 'stock': aVal = a.quantity; bVal = b.quantity; break;
        case 'sold': aVal = a.total_sold; bVal = b.total_sold; break;
        case 'category': aVal = a.category; bVal = b.category; break;
        case 'status': aVal = a.status; bVal = b.status; break;
        default: aVal = a.name; bVal = b.name;
      }
      if (sortOrder === 'desc') {
        return aVal > bVal ? -1 : 1;
      }
      return aVal > bVal ? 1 : -1;
    });

    return result;
  }, [products, searchTerm, sortBy, sortOrder, categoryFilter, statusFilter, minStock, maxStock]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'Draft': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'Out of Stock': return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'Discontinued': return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
    }
  };

  const ProductCard = ({ id, img, name, sku, price, quantity, category, status, total_sold, desc, tags }) => (
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

      {/* Edit Button */}
      <button
        onClick={() => handleEdit({ id, img, name, sku, price, quantity, category, status, total_sold, desc, tags })}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all group/edit hover:scale-110 shadow-lg hover:shadow-white/20 opacity-0 group-hover:opacity-100"
      >
        <svg className="w-5 h-5 text-white/90 group-hover/edit:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.5h3m1 1v-2a2 2 0 00-2-2H7a2 2 0 00-2 2v2" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Sidebar />
      <main className="ml-0 md:ml-64 p-8 md:p-12 flex flex-col min-h-screen">
        <div className="flex-1">
          <div className="mb-12">
            <div className='mb-8'> 
                <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                  Products
                </h1>
                <p className="text-slate-400">Manage your products and inventory with ease. View details and stock status.</p>
              </div>
            {/* Filters Section - Matching OrdersTable/CustomersTable UI */}
            <div className="space-y-6 mb-12">
              {/* Search & Sort */}
              <div className="bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <input
                    type="text"
                    placeholder="Search name, SKU, description or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 min-w-64 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                  <div className="flex gap-2 flex-wrap">
                    {['name', 'sku', 'price', 'stock', 'sold', 'category', 'status'].map(field => (
                      <button
                        key={field}
                        onClick={() => {
                          if (sortBy === field) {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortBy(field);
                            setSortOrder('asc');
                          }
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all ${
                          sortBy === field
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md'
                            : 'bg-slate-800/50 border-white/10 hover:bg-slate-700/50 hover:border-white/20 text-slate-200'
                        }`}
                      >
                        {field === 'name' && 'Name'}
                        {field === 'sku' && 'SKU'}
                        {field === 'price' && 'Price'}
                        {field === 'stock' && 'Stock'}
                        {field === 'sold' && 'Sold'}
                        {field === 'category' && 'Category'}
                        {field === 'status' && 'Status'}
                        {sortBy === field && (sortOrder === 'desc' ? ' ↓' : ' ↑')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-xs text-slate-400 uppercase tracking-wide font-medium mb-2">Category</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-xs text-slate-400 uppercase tracking-wide font-medium mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    >
                      <option value="all">All Statuses</option>
                      {statuses.map(stat => (
                        <option key={stat} value={stat}>{stat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Min Stock */}
                  <div>
                    <label className="block text-xs text-slate-400 uppercase tracking-wide font-medium mb-2">Min Stock</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={minStock}
                      onChange={(e) => setMinStock(e.target.value)}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  {/* Max Stock */}
                  <div>
                    <label className="block text-xs text-slate-400 uppercase tracking-wide font-medium mb-2">Max Stock</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="∞"
                      value={maxStock}
                      onChange={(e) => setMaxStock(e.target.value)}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' || minStock || maxStock) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                      setStatusFilter('all');
                      setMinStock('');
                      setMaxStock('');
                      setSortBy('name');
                      setSortOrder('asc');
                    }}
                    className="mt-4 px-6 py-3 bg-slate-700/50 hover:bg-slate-600 text-slate-200 font-semibold rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2 ml-auto"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
              <div className="text-sm text-slate-400">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <button 
                onClick={() => setShowProductModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all whitespace-nowrap"
              >
                + Add Product
              </button>
            </div>

            {showProductModal && (
              <CreateProductModal 
                isOpen={showProductModal}
                onClose={() => {
                  setShowProductModal(false);
                  setEditingProduct(null);
                }}
                editingProduct={editingProduct}
                onSaveProduct={(productData) => {
                  if (editingProduct?.id || productData.id) {
                    // Update existing product
                    setProducts(prev => prev.map(p => p.id === productData.id ? { ...productData } : p));
                    alert(`✅ Product "${productData.name}" updated successfully!`);
                    console.log('Product updated:', productData);
                  } else {
                    // Create new product
                    setProducts(prev => [productData, ...prev]);
                    alert(`✅ Product "${productData.name}" added successfully!`);
                  }
                  setEditingProduct(null);
                  setShowProductModal(false);
                }}
                onUpdateProduct={handleUpdateProduct}
              />
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-slate-400 text-xl mb-4">No products found matching your filters.</p>
                <p className="text-slate-500 text-sm">Try adjusting your search, filters or sort options above.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
