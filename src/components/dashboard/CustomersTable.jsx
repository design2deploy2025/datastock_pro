import React, { useState, useMemo } from 'react';

const CustomersTable = ({ data = [], onRowClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredCustomers = useMemo(() => {
    let result = data.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.instagram.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.totalOrdersValue.includes(searchTerm)
    );

    result.sort((a, b) => {
      let aVal, bVal;
      if (sortBy === 'name') {
        aVal = a.name;
        bVal = b.name;
      } else if (sortBy === 'instagram') {
        aVal = a.instagram;
        bVal = b.instagram;
      } else if (sortBy === 'phone') {
        aVal = a.phone;
        bVal = b.phone;
      } else if (sortBy === 'total') {
        aVal = parseFloat(a.totalOrdersValue.replace(/[^0-9]/g, ''));
        bVal = parseFloat(b.totalOrdersValue.replace(/[^0-9]/g, ''));
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

  return (
    <div>
      {/* Search & Sort */}
      <div className="bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <input
            type="text"
            placeholder="Search name, instagram, phone or value..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-64 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
          <div className="flex gap-2 flex-wrap">
            {['name', 'instagram', 'phone', 'total'].map(field => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all ${
                  sortBy === field
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                    : 'bg-slate-800/50 border-white/10 hover:bg-slate-700/50 hover:border-white/20 text-slate-200'
                }`}
              >
                {field === 'name' && 'Name'}
                {field === 'instagram' && 'Instagram'}
                {field === 'phone' && 'Phone'}
                {field === 'total' && 'Value'}
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
                <th className="px-4 py-4 text-left text-slate-300 font-semibold text-base tracking-wide w-1/3">Name</th>
                <th className="px-4 py-4 text-left text-slate-300 font-semibold text-base tracking-wide w-1/4">Instagram</th>
                <th className="px-4 py-4 text-left text-slate-300 font-semibold text-base tracking-wide w-1/4">Phone</th>
                <th className="px-4 py-4 text-right text-slate-300 font-semibold text-base tracking-wide w-1/4">Total Order Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map((customer) => (
                <tr 
                  key={customer.id} 
                  className="hover:bg-slate-800/50 transition-colors cursor-pointer border-b border-white/5 last:border-b-0"
                  onClick={() => onRowClick && onRowClick(customer)}
                >
                  <td className="px-4 py-6 font-medium text-white">{customer.name}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2 py-1 bg-slate-700/50 text-slate-200 text-xs font-medium rounded-lg backdrop-blur-sm border border-white/10">
                      {customer.instagram}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-200 text-xs font-mono">{customer.phone}</td>
                  <td className="px-4 py-4 text-right font-semibold text-emerald-400 text-sm">{customer.totalOrdersValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No customers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersTable;

