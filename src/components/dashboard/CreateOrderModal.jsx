import React from 'react';

const CreateOrderModal = ({ customer, isOpen, onClose, onCreateOrder, newOrder, setNewOrder, errors, calculateTotal, handleNewOrderChange }) => {
  if (!isOpen || !customer) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-[60] p-4 md:p-8 animate-in slide-in-from-bottom-4 duration-300 fade-in-0">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-emerald-400/30 rounded-3xl shadow-2xl w-full max-w-md h-[70vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-emerald-400/20 sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">New Order</h2>
                  <p className="text-sm text-slate-400">For {customer.name}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-800/50 rounded-xl transition-all group">
                <svg className="w-6 h-6 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Order Date</label>
              <input
                type="date"
                name="date"
                value={newOrder.date}
                onChange={handleNewOrderChange}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
              {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Items (e.g. T-Shirts)</label>
              <input
                type="text"
                name="items"
                placeholder="Product name"
                value={newOrder.items}
                onChange={handleNewOrderChange}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
              {errors.items && <p className="text-red-400 text-xs mt-1">{errors.items}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Quantity</label>
                <input
                  type="number"
                  name="qty"
                  placeholder="1"
                  min="1"
                  value={newOrder.qty}
                  onChange={handleNewOrderChange}
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
                {errors.qty && <p className="text-red-400 text-xs mt-1">{errors.qty}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Unit Price (₹)</label>
                <input
                  type="number"
                  name="unitPrice"
                  placeholder="1000"
                  min="0"
                  step="0.01"
                  value={newOrder.unitPrice}
                  onChange={handleNewOrderChange}
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
                {errors.unitPrice && <p className="text-red-400 text-xs mt-1">{errors.unitPrice}</p>}
              </div>
            </div>

            <div className="p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
              <p className="text-sm text-slate-300">Total: ₹{calculateTotal()}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-emerald-400/20 bg-slate-900/95 backdrop-blur-sm sticky bottom-0 space-y-3">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-slate-700/50 hover:bg-slate-600 text-slate-200 font-semibold rounded-xl transition-all border border-white/20"
            >
              Cancel
            </button>
            <button
              onClick={onCreateOrder}
              className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 border border-emerald-400/30"
              disabled={!newOrder.date || !newOrder.items || !newOrder.qty || !newOrder.unitPrice}
            >
              Create Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrderModal;

