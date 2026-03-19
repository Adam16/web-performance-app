import React, { useState, useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { TREND_DATA } from '../constants';
import { MetricType } from '../types';
import { Info, TrendingUp, CheckCircle2 } from 'lucide-react';

const METRICS: { id: MetricType; label: string; unit: string; budget: number }[] = [
  { id: 'total', label: 'Total Payload', unit: 'MB', budget: 1.0 },
  { id: 'js', label: 'JS Volume', unit: 'KB', budget: 250 },
  { id: 'css', label: 'CSS Size', unit: 'KB', budget: 50 },
  { id: 'image', label: 'Image Payload', unit: 'KB', budget: 600 },
  { id: 'tbt', label: 'Total Blocking Time', unit: 'ms', budget: 200 },
];

export const TrendAnalysis: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<MetricType>('total');
  const [timeRange, setTimeRange] = useState('30D');

  const metricConfig = useMemo(() => 
    METRICS.find(m => m.id === activeMetric)!, 
  [activeMetric]);

  const adherenceData = useMemo(() => {
    const healthy = TREND_DATA.filter(d => d[activeMetric] <= metricConfig.budget).length;
    const breached = TREND_DATA.length - healthy;
    return [
      { name: 'Healthy', value: healthy, color: '#10b981' },
      { name: 'Breached', value: breached, color: '#ef4444' }
    ];
  }, [activeMetric, metricConfig.budget]);

  const averageValue = useMemo(() => {
    const sum = TREND_DATA.reduce((acc, curr) => acc + curr[activeMetric], 0);
    return (sum / TREND_DATA.length).toFixed(2);
  }, [activeMetric]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border-color pb-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-primary tracking-tight leading-tight">Trend Analysis</h2>
          <p className="text-muted text-lg font-medium">Historical performance and budget adherence tracking.</p>
        </div>
        
        <div className="flex bg-surface border-2 border-border-color p-1.5 rounded-xl shadow-sm">
          {['30D', '60D', '90D'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-6 py-2 rounded-lg text-xs font-bold tracking-widest transition-all ${
                timeRange === range 
                  ? 'bg-primary text-surface shadow-md' 
                  : 'text-muted hover:text-primary'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </header>

      {/* Metric Selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {METRICS.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveMetric(m.id)}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              activeMetric === m.id
                ? 'bg-primary border-primary text-surface shadow-xl shadow-primary/20'
                : 'bg-surface border-border-color text-primary hover:border-primary/30'
            }`}
          >
            <p className={`text-[10px] uppercase tracking-[0.2em] font-black mb-2 opacity-60`}>
              {m.label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black">
                {TREND_DATA[TREND_DATA.length - 1][m.id]}
              </span>
              <span className="text-xs font-bold opacity-60">{m.unit}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-surface border-2 border-border-color rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary/40" />
              <h3 className="text-xl font-black text-primary">Performance Over Time</h3>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-critical" />
                <span className="text-critical">Budget Limit</span>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                  tick={{ fontSize: 12, fill: '#64748B', fontWeight: 600 }}
                  dy={15}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B', fontWeight: 600 }}
                  domain={[0, (dataMax: number) => Math.max(dataMax, metricConfig.budget) * 1.2]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    border: 'none', 
                    borderRadius: '16px',
                    color: '#fff',
                    padding: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                  itemStyle={{ color: '#fff', fontWeight: 700 }}
                  cursor={{ stroke: '#64748B', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <ReferenceLine 
                  y={metricConfig.budget} 
                  stroke="#E11D48" 
                  strokeDasharray="6 6" 
                  strokeWidth={2}
                  label={{ 
                    position: 'right', 
                    value: 'BUDGET', 
                    fill: '#E11D48', 
                    fontSize: 10, 
                    fontWeight: 900,
                    offset: 10
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey={activeMetric} 
                  stroke="#0F172A" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Adherence Summary */}
        <div className="space-y-8">
          <div className="bg-surface border-2 border-border-color rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-black text-primary mb-8 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-success" />
              Budget Adherence
            </h3>
            
            <div className="h-[200px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adherenceData} layout="vertical" margin={{ left: -40 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" hide />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                    {adherenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {adherenceData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-4 rounded-xl bg-muted/5 border border-border-color">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-black text-muted uppercase tracking-[0.1em]">{item.name}</span>
                  </div>
                  <span className="text-lg font-black text-primary">
                    {Math.round((item.value / TREND_DATA.length) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary text-surface rounded-2xl p-8 shadow-2xl shadow-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-5 h-5 text-surface/40" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-surface/40">Optimization Insight</h4>
            </div>
            <p className="text-base leading-relaxed text-surface/80 font-medium">
              Your <span className="text-surface font-black underline decoration-success decoration-2 underline-offset-4">{metricConfig.label}</span> has been 
              <span className="text-critical font-black"> {adherenceData[1].value > adherenceData[0].value ? 'mostly above' : 'occasionally above'}</span> budget. 
              Average performance is <span className="text-surface font-black">{averageValue}{metricConfig.unit}</span>, 
              which is <span className={Number(averageValue) > metricConfig.budget ? 'text-critical' : 'text-success'}>
                {Math.abs(Math.round(((Number(averageValue) - metricConfig.budget) / metricConfig.budget) * 100))}%
                {Number(averageValue) > metricConfig.budget ? ' over' : ' under'}
              </span> the set limit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
