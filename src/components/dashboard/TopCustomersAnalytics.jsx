import React, { useState } from "react";

// Top 5 customers data with lifetime, month, year revenue (derived from mock customers)
const topCustomersData = [
  {
    name: "Lisa Wong",
    lifetime: 34200,
    month: 13680,  // ~40%
    year: 30780,   // ~90%
    rank: 1
  },
  {
    name: "Emily Rodriguez", 
    lifetime: 21320,
    month: 8528,
    year: 19188,
    rank: 2
  },
  {
    name: "Alex Turner",
    lifetime: 16890,
    month: 6756,
    year: 15201,
    rank: 3
  },
  {
    name: "Sarah Johnson",
    lifetime: 12450,
    month: 4980,
    year: 11205,
    rank: 4
  },
  {
    name: "Mike Chen",
    lifetime: 8750,
    month: 3500,
    year: 7875,
    rank: 5
  },
];

const TopCustomersAnalytics = () => {
  const [viewMode, setViewMode] = useState("lifetime");

  const getRevenue = (customer) => {
    return customer[viewMode];
  };

  const viewModeLabels = {
    lifetime: "Lifetime",
    month: "Monthly",
    year: "Yearly"
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent mb-2">
            💎 Top 5 Customers
          </h2>
          <p className="text-lg text-slate-400">
            {viewModeLabels[viewMode]} highest spending customers
          </p>
        </div>
        
        {/* Toggle Buttons */}
        <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1">
          {["lifetime", "month", "year"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all ${
                viewMode === mode
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {viewModeLabels[mode]}
            </button>
          ))}
        </div>
      </div>

      {/* Simple List */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
        <div className="space-y-4">
          {topCustomersData.map((customer) => (
            <div key={customer.name} className="flex items-center gap-4 p-4 bg-white/2 rounded-xl hover:bg-white/5 transition-all border border-white/5">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg">
                #{customer.rank}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white text-lg">{customer.name}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-purple-400">
                  ₹{getRevenue(customer).toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">revenue</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCustomersAnalytics;

