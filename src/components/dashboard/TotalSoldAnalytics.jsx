import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ShoppingBagIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

// Reusable Analytics Card Component (with hardcoded accent classes)
const AnalyticsCard = ({ title, value, delta, deltaType, trendData, gradientId, glowColor, Icon, buttonClasses, iconClasses, glowOverlayClasses }) => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden hover:shadow-[0_0_35px_rgba(var(--glow-color),0.6)]">
      {/* Top-right circular button */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className={buttonClasses}>
          <FunnelIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className={iconClasses}>
          <Icon className="h-12 w-12 drop-shadow-lg" />
        </div>
      </div>

      {/* Title */}
      <p className="text-sm font-medium uppercase tracking-wider text-slate-400 mb-2 text-center">
        {title}
      </p>

      {/* Value */}
      <div className="text-center mb-8">
        <div className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl mb-2">
          {value.toLocaleString()}
        </div>
      </div>

      {/* Delta */}
      <div className={`flex items-center justify-center text-sm font-semibold gap-1 mb-8 ${deltaType === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
        {deltaType === 'up' ? (
          <ArrowTrendingUpIcon className="h-5 w-5" />
        ) : (
          <ArrowTrendingDownIcon className="h-5 w-5" />
        )}
        <span>{delta}</span>
      </div>

      {/* Mini Line Graph */}
      <div className="h-32 md:h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={`rgba(${glowColor}, 0.8)`} />
                <stop offset="50%" stopColor={`rgba(${glowColor}, 0.4)`} />
                <stop offset="100%" stopColor={`rgba(${glowColor}, 0.1)`} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} tickMargin={10} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{
                background: 'rgba(0,0,0,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(20px)',
              }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={`url(#${gradientId})`} 
              strokeWidth={3}
              dot={{
                fill: `rgba(${glowColor}, 0.8)`,
                strokeWidth: 2,
                stroke: '#fff',
                r: 4
              }}
              activeDot={{
                r: 6,
                strokeWidth: 3,
                stroke: '#fff',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Subtle glow overlay */}
      <div className={glowOverlayClasses}></div>
    </div>
  );
};

const TotalSoldAnalytics = () => {
  const [timeRange, setTimeRange] = useState('Lifetime');

  // Dummy trend data
  const lifetimeData = [
    { name: 'Jan', value: 850 }, { name: 'Feb', value: 920 }, { name: 'Mar', value: 950 },
    { name: 'Apr', value: 980 }, { name: 'May', value: 1020 }, { name: 'Jun', value: 1088 },
  ];
  const todayData = [
    { name: '9AM', value: 12 }, { name: '12PM', value: 28 }, { name: '3PM', value: 35 },
    { name: '6PM', value: 42 }, { name: '9PM', value: 45 },
  ];
  const monthlyData = [
    { name: 'W1', value: 45 }, { name: 'W2', value: 78 }, { name: 'W3', value: 210 },
    { name: 'W4', value: 256 },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-2xl mb-2">
            Total Sold Analytics
          </h2>
          <p className="text-lg text-slate-400 max-w-md">
            Track your sales performance with real-time insights
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {/* Time Range Dropdown */}
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 text-white font-medium shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-w-[160px]"
            >
              <option value="24H">24H</option>
              <option value="Monthly">Monthly</option>
              <option value="Lifetime">Lifetime</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {/* Filter Pill */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-blue-500/30 rounded-2xl px-6 py-3 flex items-center gap-2 shadow-lg hover:shadow-xl hover:shadow-blue-400/40 transition-all duration-300 cursor-pointer">
            <FunnelIcon className="h-5 w-5 text-blue-400" />
            <span className="font-medium text-white">Sales Data</span>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Lifetime Total Sold"
          value={1088}
          delta="+12%"
          deltaType="up"
          trendData={lifetimeData}
          gradientId="gradient-blue"
          glowColor="59,130,246"
          Icon={ShoppingBagIcon}
          buttonClasses="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center transition-all duration-300 text-blue-300"
          iconClasses="p-4 bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-blue-600/20 rounded-2xl border border-blue-500/30 shadow-lg backdrop-blur-md"
          glowOverlayClasses="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />
        <AnalyticsCard
          title="Today's Total Sold"
          value={45}
          delta="+8%"
          deltaType="up"
          trendData={todayData}
          gradientId="gradient-purple"
          glowColor="168,85,247"
          Icon={ArrowTrendingUpIcon}
          buttonClasses="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-purple-500/30 flex items-center justify-center transition-all duration-300 text-purple-300"
          iconClasses="p-4 bg-gradient-to-br from-purple-500/20 via-purple-400/10 to-purple-600/20 rounded-2xl border border-purple-500/30 shadow-lg backdrop-blur-md"
          glowOverlayClasses="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />
        <AnalyticsCard
          title="Monthly Total Sold"
          value={256}
          delta="-3%"
          deltaType="down"
          trendData={monthlyData}
          gradientId="gradient-red"
          glowColor="239,68,68"
          Icon={ArrowTrendingUpIcon}
          buttonClasses="w-12 h-12 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-red-500/30 flex items-center justify-center transition-all duration-300 text-red-300"
          iconClasses="p-4 bg-gradient-to-br from-red-500/20 via-red-400/10 to-red-600/20 rounded-2xl border border-red-500/30 shadow-lg backdrop-blur-md"
          glowOverlayClasses="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />
      </div>
    </div>
  );
};

export default TotalSoldAnalytics;

