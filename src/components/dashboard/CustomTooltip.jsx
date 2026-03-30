import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="z-100 p-3 border border-white/20 rounded-xl bg-black/95 backdrop-blur-xl shadow-2xl min-w-[120px]">
        <p className="font-bold text-white text-lg mb-1 label">{label}</p>
        <p className="text-2xl font-black text-blue-400 value">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
