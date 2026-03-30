import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import TotalSoldAnalytics from '../../components/dashboard/TotalSoldAnalytics';
import TopProductsAnalytics from '../../components/dashboard/TopProductsAnalytics';
import LowStockProductsAnalytics from '../../components/dashboard/LowStockProductsAnalytics';
import TotalRevenueAnalytics from '../../components/dashboard/TotalRevenueAnalytics';

import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Analytics = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Sidebar />
      <main className="ml-0 md:ml-64 p-8 md:p-12 flex flex-col min-h-screen">
        <div className="flex-1 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Analytics Dashboard
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Track total quantity sold across lifetime, daily, and monthly views with interactive trend graphs.
            </p>
          </div>
          <TotalSoldAnalytics />
          <TotalRevenueAnalytics />
          <div className="mt-16 pt-12 border-t border-white/10">
            <TopProductsAnalytics />
          </div>
          <div className="mt-16 pt-12 border-t border-white/10">
            <LowStockProductsAnalytics />
          </div>

        </div>
      </main>
    </div>
  );
};

export default Analytics;

