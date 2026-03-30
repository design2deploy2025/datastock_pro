import React, { useState } from 'react';

const CreateCustomerModal = ({ 
  isOpen, 
  onClose, 
  onSaveCustomer 
}) => {
  if (!isOpen) return null;

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    instagram: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const getAvatar = (name) => {
    if (!name) return '';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name.split(' ').map(n => n[0]).join(''))}&background=1e293b&color=f8fafc&size=128&bold=true`;
  };

  const avatarPreview = getAvatar(newCustomer.name);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newCustomer.name?.trim()) newErrors.name = 'Name is required';
    if (!newCustomer.instagram?.trim()) newErrors.instagram = 'Instagram handle is required';
    if (!newCustomer.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!newCustomer.address?.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const customerData = {
      id: Date.now(),
      name: newCustomer.name.trim(),
      avatar: avatarPreview,
      instagram: newCustomer.instagram.trim(),
      phone: newCustomer.phone.trim(),
      address: newCustomer.address.trim(),
      totalOrdersValue: '₹0',
      orders: []
    };

    onSaveCustomer(customerData);
    console.log('✅ New customer created:', customerData);
    alert('Customer created successfully!');
  };

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
                  src={avatarPreview || '/api/placeholder/80/80'} 
                  alt={newCustomer.name || 'New Customer'}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl ring-2 ring-white/20 shadow-lg flex-shrink-0 hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/80/80';
                  }}
                />
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent leading-tight">
                    New Customer
                  </h2>
                  <p className="text-sm lg:text-base text-slate-400 mt-1 font-medium">
                    Fill all fields to create a new customer profile
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
            {/* Form Fields - 2x2 grid matching order modal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleChange}
                  className={`w-full bg-slate-900/80 backdrop-blur-sm border rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? 'border-red-400/50 ring-red-400/30' : 'border-white/10 focus:border-emerald-400/50 focus:ring-emerald-400/50'
                  }`}
                  placeholder="Sarah Johnson"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.921.146-6.462 2.556-6.61 6.611-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.148 4.955 2.683 6.611 6.61 6.61 1.28.059 1.688.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.924-.146 6.464-2.541 6.61-6.61.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.146-4.92-2.556-6.61-6.611-6.61-1.28-.059-1.689-.073-4.948-.073z"/>
                    <path d="M12 5.839c-2.847 0-5.158 2.311-5.158 5.158s2.311 5.158 5.158 5.158 5.158-2.311 5.158-5.158-2.311-5.158-5.158-5.158z"/>
                    <path d="M15.663 11.998h-1.68v-1.679h2.928v1.679h-1.248v3.553h-1.001V11.998z"/>
                  </svg>
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={newCustomer.instagram}
                  onChange={handleChange}
                  className={`w-full bg-slate-900/80 backdrop-blur-sm border rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:ring-2 transition-all ${
                    errors.instagram ? 'border-red-400/50 ring-red-400/30' : 'border-white/10 focus:border-pink-400/50 focus:ring-pink-400/50'
                  }`}
                  placeholder="@sarahj_sells"
                />
                {errors.instagram && <p className="text-red-400 text-sm mt-1">{errors.instagram}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleChange}
                  className={`w-full bg-slate-900/80 backdrop-blur-sm border rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:ring-2 transition-all ${
                    errors.phone ? 'border-red-400/50 ring-red-400/30' : 'border-white/10 focus:border-emerald-400/50 focus:ring-emerald-400/50'
                  }`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Address
                </label>
                <textarea
                  name="address"
                  value={newCustomer.address}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full bg-slate-900/80 backdrop-blur-sm border rounded-xl px-4 py-3 text-white text-sm leading-relaxed focus:outline-none focus:ring-2 transition-all resize-vertical ${
                    errors.address ? 'border-red-400/50 ring-red-400/30' : 'border-white/10 focus:border-blue-400/50 focus:ring-blue-400/50'
                  }`}
                  placeholder="123 Green Street, Mumbai, Maharashtra 400001"
                />
                {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>

            {/* Preview Stats - matching LTV style */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Status</p>
                <p className="text-2xl font-bold text-emerald-400">New</p>
              </div>
              <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Orders</p>
                <p className="text-2xl font-bold text-slate-400">0</p>
              </div>
              <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Lifetime Value</p>
                <p className="text-2xl font-bold text-slate-400">₹0</p>
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
                disabled={!newCustomer.name || !newCustomer.instagram || !newCustomer.phone || !newCustomer.address}
                className="flex-1 px-6 py-4 bg-emerald-600/80 hover:bg-emerald-500 disabled:bg-emerald-700/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all border border-emerald-400/30 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/25"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Create Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCustomerModal;

