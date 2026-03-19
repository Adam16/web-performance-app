import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TREND_DATA } from '../constants';

export const TrendAnalysis: React.FC = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const budget = 1.2;
      const delta = value - budget;
      const isBreached = delta > 0;

      return (
        <div className="bg-surface border-2 border-border-color p-5 rounded-2xl shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
          <div className="border-b border-border-color pb-2">
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">{label}, 2024</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center gap-8">
              <span className="text-sm font-bold text-primary">Actual Payload</span>
              <span className="text-sm font-black text-primary">{value.toFixed(2)} MB</span>
            </div>
            <div className="flex justify-between items-center gap-8">
              <span className="text-sm font-medium text-muted">Budget Limit</span>
              <span className="text-sm font-medium text-muted">{budget.toFixed(2)} MB</span>
            </div>
          </div>
          <div className="pt-3 border-t border-border-color flex justify-between items-center">
            <span className="text-sm font-bold text-primary">Delta</span>
            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isBreached ? 'bg-critical/10 text-critical' : 'bg-success/10 text-success'}`}>
              {isBreached ? `+${(delta * 1000).toFixed(0)} KB` : `${(delta * 1000).toFixed(0)} KB`}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border-color pb-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-primary tracking-tight leading-tight">Trend Analysis</h2>
          <p className="text-muted text-lg font-medium">Historical payload sizes vs. established performance budgets.</p>
        </div>
        
        <div className="flex bg-surface border-2 border-border-color p-1.5 rounded-xl shadow-sm">
          {['30D', '60D', '90D'].map((range) => (
            <button
              key={range}
              className={`px-6 py-2 rounded-lg text-xs font-bold tracking-widest transition-all ${
                range === '30D' 
                  ? 'bg-primary text-surface shadow-md' 
                  : 'text-muted hover:text-primary'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </header>

      <div className="bg-surface border border-border-color rounded-2xl p-8 shadow-sm h-[600px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={TREND_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F172A" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
              tickFormatter={(val) => `${val.toFixed(1)} MB`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#64748B', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <ReferenceLine 
              y={1.2} 
              stroke="#E11D48" 
              strokeDasharray="6 6" 
              strokeWidth={2}
              label={{ 
                value: 'MAX BUDGET (1.2 MB)', 
                position: 'right', 
                fill: '#E11D48', 
                fontSize: 10, 
                fontWeight: 800,
                offset: 10
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#0F172A" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
