import React, { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import CustomTooltip from "./CustomTooltip";

// Reusable Analytics Card Component (copied from TotalSoldAnalytics)
const AnalyticsCard = ({
  title,
  value,
  delta,
  deltaType,
  trendData,
  gradientId,
  glowColor,
  Icon,
  buttonClasses,
  iconClasses,
  glowOverlayClasses,
}) => {
  return (
    <div className="group relative overflow-visible bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(var(--glow-color),0.6)]">
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
          ${value.toLocaleString()}
        </div>
      </div>

      {/* Delta */}
      <div
        className={`flex items-center justify-center text-sm font-semibold gap-1 mb-8 ${deltaType === "up" ? "text-emerald-400" : "text-red-400"}`}
      >
        {deltaType === "up" ? (
          <ArrowTrendingUpIcon className="h-5 w-5" />
        ) : (
          <ArrowTrendingDownIcon className="h-5 w-5" />
        )}
        <span>{delta}</span>
      </div>

      {/* Mini Line Graph */}
      <div className="h-32 md:h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={`rgba(${glowColor}, 0.8)`} />
                <stop offset="50%" stopColor={`rgba(${glowColor}, 0.4)`} />
                <stop offset="100%" stopColor={`rgba(${glowColor}, 0.1)`} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              tickMargin={10}
            />
            <YAxis hide />
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 9999, pointerEvents: "none" }}
              position={{ y: 0 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={`url(#${gradientId})`}
              strokeWidth={3}
              dot={{
                fill: `rgba(${glowColor}, 0.8)`,
                strokeWidth: 2,
                stroke: "#fff",
                r: 4,
              }}
              activeDot={{
                r: 6,
                strokeWidth: 3,
                stroke: "#fff",
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

const TotalRevenueAnalytics = () => {
  // Dummy revenue trend data (similar pattern to TotalSoldAnalytics)
  const lifetimeData = [
    { name: "Jan", value: 12420 },
    { name: "Feb", value: 13450 },
    { name: "Mar", value: 14120 },
    { name: "Apr", value: 14890 },
    { name: "May", value: 15230 },
    { name: "Jun", value: 15420 },
  ];
  const todayData = [
    { name: "9AM", value: 320 },
    { name: "12PM", value: 680 },
    { name: "3PM", value: 980 },
    { name: "6PM", value: 1150 },
    { name: "9PM", value: 1280 },
  ];
  const monthlyData = [
    { name: "W1", value: 1280 },
    { name: "W2", value: 2560 },
    { name: "W3", value: 5780 },
    { name: "W4", value: 8950 },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-2xl mb-2">
            Total Revenue Analytics
          </h2>
          <p className="text-lg text-slate-400 max-w-md">
            Monitor your revenue streams with real-time insights
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Lifetime Revenue"
          value={15420}
          delta="+18%"
          deltaType="up"
          trendData={lifetimeData}
          gradientId="gradient-teal"
          glowColor="34,197,94"
          Icon={CurrencyDollarIcon}
          buttonClasses="w-12 h-12 rounded-2xl bg-gradient-to-r from-teal-500/20 to-teal-600/20 border border-teal-400/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-teal-500/30 flex items-center justify-center transition-all duration-300 text-teal-300"
          iconClasses="p-4 bg-gradient-to-br from-teal-500/20 via-teal-400/10 to-teal-600/20 rounded-2xl border border-teal-500/30 shadow-lg backdrop-blur-md"
          glowOverlayClasses="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />
        <AnalyticsCard
          title="Today's Revenue"
          value={1280}
          delta="+11%"
          deltaType="up"
          trendData={todayData}
          gradientId="gradient-emerald"
          glowColor="16,185,129"
          Icon={ArrowTrendingUpIcon}
          buttonClasses="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-400/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center transition-all duration-300 text-emerald-300"
          iconClasses="p-4 bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-emerald-600/20 rounded-2xl border border-emerald-500/30 shadow-lg backdrop-blur-md"
          glowOverlayClasses="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />
        <AnalyticsCard
          title="Monthly Revenue"
          value={8950}
          delta="+5%"
          deltaType="up"
          trendData={monthlyData}
          gradientId="gradient-pink"
          glowColor="236,72,153"
          Icon={FunnelIcon}
          buttonClasses="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500/20 to-pink-600/20 border border-pink-400/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-pink-500/30 flex items-center justify-center transition-all duration-300 text-pink-300"
          iconClasses="p-4 bg-gradient-to-br from-pink-500/20 via-pink-400/10 to-pink-600/20 rounded-2xl border border-pink-500/30 shadow-lg backdrop-blur-md"
          glowOverlayClasses="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />
      </div>
    </div>
  );
};

export default TotalRevenueAnalytics;

