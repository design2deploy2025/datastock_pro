import React, { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

// Top 5 low stock products data 
const lowStockData = [
  {
    name: "Gaming Mouse",
    stock: 5,
    rank: 1
  },
  {
    name: "Cotton T-shirt", 
    stock: 12,
    rank: 2
  },
  {
    name: "Wireless Keyboard",
    stock: 18,
    rank: 3
  },
  {
    name: "128GB USB Drive",
    stock: 27,
    rank: 4
  },
  {
    name: "Stainless Steel Water Bottle",
    stock: 35,
    rank: 5
  },
];

const LowStockProductsAnalytics = () => {
  const [viewMode, setViewMode] = useState("current");

  const getStockCount = (product) => {
    return product.stock;
  };

  const viewModeLabels = {
    current: "Current Stock"
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        

         <div> 
                <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                  Top 5 Low Stock
                </h1>
                <p className="text-slate-400">{viewModeLabels[viewMode]} lowest stock products</p>
              </div>
        
        {/* Toggle Buttons - single for now */}
        <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1">
          {["current"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all ${
                viewMode === mode
                  ? "bg-gradient-to-r from-red-500 to-yellow-500 text-white shadow-lg shadow-red-500/25"
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
          {lowStockData.map((product) => (
            <div key={product.name} className="flex items-center gap-4 p-4 bg-white/2 rounded-xl hover:bg-white/5 transition-all border border-white/5">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg">
                #{product.rank}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white text-lg">{product.name}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-red-400">
                  {getStockCount(product).toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">in stock</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LowStockProductsAnalytics;

