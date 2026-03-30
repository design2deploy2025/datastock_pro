import React, { useState, useMemo, useEffect } from 'react';

const mockOrders = [
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
    products: [{name: 'T-Shirt Premium Cotton', price: 1400, qty: 3, discount: 0}]
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
    products: [{name: 'Hoodie Winter Fleece', price: 2800, qty: 1, discount: 0}]
  },
  { 
    id: 3, 
    displayId: 'ORD-20241018-003',
    date: '2024-10-18',
    productName: 'Jeans Slim Fit x 2',
    value: '₹5,450',
    invoiceUrl: '#',
    customerName: 'Emily Rodriguez',
    status: 'Processing',
    paymentStatus: 'Pending',
    source: 'Phone',
    products: [{name: 'Jeans Slim Fit', price: 2725, qty: 2, discount: 0}]
  },
  { 
    id: 4, 
    displayId: 'ORD-20241017-004',
    date: '2024-10-17',
    productName: 'Sneakers Air Max',
    value: '₹3,500',
    invoiceUrl: '#', 
    customerName: 'Mike Chen',
    status: 'Delivered',
    paymentStatus: 'Paid',
    source: 'Walk-in',
    products: [{name: 'Sneakers Air Max', price: 3500, qty: 1, discount: 0}]
  },
  { 
    id: 5, 
    displayId: 'ORD-20241016-005',
    date: '2024-10-16',
    productName: 'Dress Floral Maxi',
    value: '₹8,200',
    invoiceUrl: '#',
    customerName: 'Rachel Kim',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    source: 'Instagram',
    products: [{name: 'Dress Floral Maxi', price: 8200, qty: 1, discount: 0}]
  },
  { 
    id: 6, 
    displayId: 'ORD-20241015-006',
    date: '2024-10-15',
    productName: 'Jacket Leather Bomber',
    value: '₹12,300',
    invoiceUrl: '#',
    customerName: 'Lisa Wong',
    status: 'Shipped',
    paymentStatus: 'Paid',
    source: 'Website',
    products: [{name: 'Jacket Leather Bomber', price: 12300, qty: 1, discount: 0}]
  },
  {
    id: 7, 
    displayId: 'ORD-20241014-007',
    date: '2024-10-14',
    productName: 'Backpack Travel Pro',
    value: '₹5,600',
    invoiceUrl: '#',
    customerName: 'Alex Turner',
    status: 'Delivered',
    paymentStatus: 'Paid',
    source: 'Instagram',
    products: [{name: 'Backpack Travel Pro', price: 5600, qty: 1, discount: 0}]
  }
];

const OrdersTable = ({ data = mockOrders, onRowClick, onOrderUpdate }) => {
  const [editingRowId, setEditingRowId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc'); // Newest first

  const filteredOrders = useMemo(() => {
    let result = data.filter(order =>
      order.displayId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(order.date).toLocaleDateString().includes(searchTerm)
    );

    result.sort((a, b) => {
      let aVal, bVal;
      if (sortBy === 'displayId') {
        aVal = a.displayId;
        bVal = b.displayId;
      } else if (sortBy === 'date') {
        aVal = new Date(a.date);
        bVal = new Date(b.date);
      } else if (sortBy === 'product') {
        aVal = a.productName;
        bVal = b.productName;
      } else if (sortBy === 'value') {
        aVal = parseFloat(a.value.replace(/[^0-9]/g, ''));
        bVal = parseFloat(b.value.replace(/[^0-9]/g, ''));
      } else if (sortBy === 'customer') {
        aVal = a.customerName;
        bVal = b.customerName;
      }

      if (sortOrder === 'desc') {
        return aVal > bVal ? -1 : 1;
      }
      return aVal > bVal ? 1 : -1;
    });

    return result;
  }, [searchTerm, sortBy, sortOrder, data]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleInvoiceClick = (e, invoiceUrl) => {
    e.stopPropagation(); // Prevent row click
    // Mock PDF download
    console.log('Download invoice:', invoiceUrl);
    alert(`Downloading invoice ${invoiceUrl}... (Mock PDF)`);
    // Real: window.open(invoiceUrl) or download logic
  };

  const startEdit = (order) => {
    setEditingRowId(order.id);
    setEditData({ ...order });
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const saveEdit = () => {
    onOrderUpdate(editData);
    setEditingRowId(null);
    setEditData({});
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setEditData({});
  };

  return (
    <div>
      {/* Search & Sort */}
      <div className="bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <input
            type="text"
            placeholder="Search order ID, product, customer or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-64 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
          <div className="flex gap-2">
            {['date', 'displayId', 'product', 'value', 'customer'].map(field => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all ${
                  sortBy === field
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                    : 'bg-slate-800/50 border-white/10 hover:bg-slate-700/50 hover:border-white/20 text-slate-200'
                }`}
              >
                {field === 'date' && 'Date'}
                {field === 'displayId' && 'ID'}
                {field === 'product' && 'Product'}
                {field === 'value' && 'Value'}
                {field === 'customer' && 'Customer'}
                {sortBy === field && (sortOrder === 'desc' ? ' ↓' : ' ↑')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/70 border-b border-white/10">
              <tr>
                <th className="px-4 py-4 text-left text-slate-300 font-semibold text-base tracking-wide w-48">Order ID</th>
                <th className="px-4 py-4 text-left text-slate-300 font-semibold text-base tracking-wide w-32">Date</th>
                <th className="px-4 py-4 text-left text-slate-300 font-semibold text-base tracking-wide flex-1 min-w-0">Product</th>
                <th className="px-4 py-4 text-right text-slate-300 font-semibold text-base tracking-wide w-32">Value</th>
                <th className="px-4 py-4 text-center text-slate-300 font-semibold text-base tracking-wide w-28">Status</th>
                <th className="px-4 py-4 text-center text-slate-300 font-semibold text-base tracking-wide w-32">Payment</th>
                <th className="px-4 py-4 text-center text-slate-300 font-semibold text-base tracking-wide w-24">Source</th>
                <th className="px-4 py-4 text-center text-slate-300 font-semibold text-base tracking-wide w-20">Actions</th>
                <th className="px-4 py-4 text-center text-slate-300 font-semibold text-base tracking-wide w-24">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className={`hover:bg-slate-800/50 transition-colors border-b border-white/5 last:border-b-0 ${editingRowId === order.id ? 'bg-emerald-500/10 ring-2 ring-emerald-400/50' : 'cursor-pointer'}`}
                  onClick={(e) => editingRowId === order.id ? e.stopPropagation() : onRowClick && onRowClick(order)}
                >
                  <td className="px-4 py-6 font-mono text-sm font-semibold text-emerald-400 bg-emerald-500/5 inline-block w-48">
                    {order.displayId}
                  </td>
                  <td className="px-4 py-4 text-slate-300 text-sm font-mono">
                    {new Date(order.date).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-4 py-4 text-white max-w-0 truncate" title={order.productName}>
                    {order.productName}
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-emerald-400 text-lg">{order.value}</td>
                  {/* Status */}
                  <td className="px-4 py-4 text-center w-28">
                    {editingRowId === order.id ? (
                      <select 
                        value={editData.status || order.status} 
                        onChange={(e) => handleEditChange('status', e.target.value)}
                        className="bg-slate-800/50 border border-white/10 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-emerald-500/50 text-white w-full"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300' :
                        order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-300' :
                        order.status === 'Processing' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {order.status}
                      </span>
                    )}
                  </td>
                  {/* Payment */}
                  <td className="px-4 py-4 text-center w-32">
                    {editingRowId === order.id ? (
                      <select 
                        value={editData.paymentStatus || order.paymentStatus} 
                        onChange={(e) => handleEditChange('paymentStatus', e.target.value)}
                        className="bg-slate-800/50 border border-white/10 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-emerald-500/50 text-white w-full"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-300' :
                        order.paymentStatus === 'Refunded' ? 'bg-green-500/20 text-green-300' :
                        'bg-amber-500/20 text-amber-300'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    )}
                  </td>
                  {/* Source */}
                  <td className="px-4 py-4 text-center w-24">
                    {editingRowId === order.id ? (
                      <select 
                        value={editData.source || order.source} 
                        onChange={(e) => handleEditChange('source', e.target.value)}
                        className="bg-slate-800/50 border border-white/10 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-emerald-500/50 text-white w-full"
                      >
                        <option value="Instagram">Instagram</option>
                        <option value="Website">Website</option>
                        <option value="Phone">Phone</option>
                        <option value="Walk-in">Walk-in</option>
                      </select>
                    ) : (
                      <span className="text-slate-300 text-sm font-medium">
                        {order.source}
                      </span>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-4 text-center w-20">
                    {editingRowId === order.id ? (
                      <div className="flex gap-1 justify-center">
                        <button
                          onClick={saveEdit}
                          className="p-1.5 bg-emerald-500/80 hover:bg-emerald-400 text-white rounded-lg transition-all text-xs font-semibold shadow-md hover:shadow-emerald-500/25"
                          title="Save"
                        >
                          ✓
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1.5 bg-slate-600/80 hover:bg-slate-500 text-white rounded-lg transition-all text-xs font-semibold shadow-md hover:shadow-slate-400/25"
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(order);
                        }}
                        className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-all group"
                        title="Edit"
                      >
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    )}
                  </td>
                  {/* Invoice */}
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={(e) => handleInvoiceClick(e, order.invoiceUrl)}
                      className="p-2 hover:bg-slate-700/50 rounded-lg transition-all group"
                      title="Download PDF Invoice"
                    >
                      <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10l-5.5 5.5m0 0L7.5 20.5 12 16m-7.5 4L12 16l5.5 5.5m0 0L19.5 16 16 20.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No orders found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;

