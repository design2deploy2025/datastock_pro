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

const OrdersTable = ({ data = mockOrders, onRowClick }) => {
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
                <th className="px-4 py-4 text-center text-slate-300 font-semibold text-base tracking-wide w-24">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="hover:bg-slate-800/50 transition-colors cursor-pointer border-b border-white/5 last:border-b-0"
                  onClick={() => onRowClick && onRowClick(order)}
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

