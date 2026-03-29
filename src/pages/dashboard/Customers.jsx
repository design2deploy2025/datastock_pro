import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const customers = [
  { id: 1, name: 'Sarah Johnson', instagram: '@sarahj_sells', phone: '+91 98765 43210', totalOrdersValue: '₹12,450' },
  { id: 2, name: 'Mike Chen', instagram: '@mikechen.shop', phone: '+91 98765 43211', totalOrdersValue: '₹8,750' },
  { id: 3, name: 'Emily Rodriguez', instagram: '@emilyvibes_', phone: '+91 98765 43212', totalOrdersValue: '₹21,320' },
  { id: 4, name: 'David Patel', instagram: '@davidpatel.co', phone: '+91 98765 43213', totalOrdersValue: '₹5,680' },
  { id: 5, name: 'Lisa Wong', instagram: '@lisawongstyle', phone: '+91 98765 43214', totalOrdersValue: '₹34,200' },
  { id: 6, name: 'Alex Turner', instagram: '@alexturner_gear', phone: '+91 98765 43215', totalOrdersValue: '₹16,890' },
  { id: 7, name: 'Rachel Kim', instagram: '@rachelk_boutique', phone: '+91 98765 43216', totalOrdersValue: '₹9,120' },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('name');
  const [sortOrder, setSortOrder] = React.useState('asc');

  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const filteredCustomers = React.useMemo(() => {
    let result = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.instagram.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.totalOrdersValue.includes(searchTerm)
    );

    // Sort
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
  }, [searchTerm, sortBy, sortOrder]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Sidebar />
      <main className="ml-0 md:ml-64 p-8 md:p-12 flex flex-col min-h-screen">
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Customers
            </h1>
            <p className="text-slate-400">Manage and view your customer list.</p>
          </div>

          {/* Filters */}
          <div className="bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  placeholder="Search name, instagram, phone or value..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 min-w-64 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
                <select 
                  value={sortBy}
                  onChange={(e) => {
                    if (sortBy === e.target.value) {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy(e.target.value);
                      setSortOrder('asc');
                    }
                  }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                >
                  <option value="name">Sort Name</option>
                  <option value="instagram">Sort Instagram</option>
                  <option value="phone">Sort Phone</option>
                  <option value="total">Sort Value</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customers Table Card */}
          <div className="bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/70 border-b border-white/10">
                  <tr>
                    <th className="px-3 py-4 text-left text-slate-300 font-semibold text-base tracking-wide w-1/3">Name</th>
                    <th className="px-3 py-4 text-left text-slate-300 font-semibold text-base tracking-wide w-1/4">Instagram</th>
                    <th className="px-3 py-4 text-left text-slate-300 font-semibold text-base tracking-wide w-1/4">Phone</th>
                    <th className="px-3 py-4 text-right text-slate-300 font-semibold text-base tracking-wide w-1/4">Total Order Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-800/50 transition-colors cursor-pointer border-b border-white/5 last:border-b-0">
                      <td className="px-3 py-4 font-medium text-white">{customer.name}</td>
                      <td className="px-3 py-4">
                        <span className="inline-flex items-center px-2 py-1 bg-slate-700/50 text-slate-200 text-xs font-medium rounded-lg backdrop-blur-sm border border-white/10">
                          {customer.instagram}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-slate-200 text-xs font-mono">{customer.phone}</td>
                      <td className="px-3 py-4 text-right font-semibold text-emerald-400 text-sm">{customer.totalOrdersValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customers;

