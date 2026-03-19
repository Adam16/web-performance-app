import React, { useState, useMemo } from 'react';
import { Save, AlertTriangle, History, TrendingUp, ArrowRight } from 'lucide-react';
import { TREND_DATA } from '../constants';
import { MetricType } from '../types';

interface Budget {
  id: MetricType;
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
}

export const BudgetEnforcer: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: 'js', label: 'JavaScript Volume', value: 250, unit: 'KB', min: 50, max: 1000, step: 10 },
    { id: 'css', label: 'CSS Size', value: 50, unit: 'KB', min: 10, max: 200, step: 5 },
    { id: 'image', label: 'Image Payload', value: 600, unit: 'KB', min: 100, max: 2000, step: 50 },
    { id: 'tbt', label: 'Total Blocking Time', value: 200, unit: 'ms', min: 50, max: 1000, step: 10 },
  ]);

  const [hasChanges, setHasChanges] = useState(false);

  const historicalStats = useMemo(() => {
    return budgets.reduce((acc, b) => {
      const values = TREND_DATA.map(d => d[b.id]);
      const avg = values.reduce((s, v) => s + v, 0) / values.length;
      const max = Math.max(...values);
      const adherence = values.filter(v => v <= b.value).length / values.length;
      
      acc[b.id] = {
        avg: Math.round(avg),
        max: Math.round(max),
        adherence: Math.round(adherence * 100)
      };
      return acc;
    }, {} as Record<string, { avg: number; max: number; adherence: number }>);
  }, [budgets]);

  const handleUpdate = (id: string, newValue: number) => {
    setBudgets(prev => prev.map(b => b.id === id ? { ...b, value: newValue } : b));
    setHasChanges(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border-color pb-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-primary tracking-tight leading-tight">Budget Enforcer</h2>
          <p className="text-muted text-lg font-medium">Define and monitor performance thresholds for your application.</p>
        </div>
        
        <button 
          disabled={!hasChanges}
          onClick={() => setHasChanges(false)}
          className={`flex items-center gap-3 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] transition-all ${
            hasChanges 
              ? 'bg-primary text-surface shadow-2xl shadow-primary/30 hover:-translate-y-1' 
              : 'bg-muted/10 text-muted cursor-not-allowed'
          }`}
        >
          <Save className="w-5 h-5" />
          Apply Changes
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {budgets.map((budget) => {
          const stats = historicalStats[budget.id];
          const isHealthy = stats.avg <= budget.value;

          return (
            <div key={budget.id} className="bg-surface border-2 border-border-color rounded-3xl p-8 shadow-sm space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-primary">{budget.label}</h3>
                  <p className="text-xs font-bold text-muted uppercase tracking-widest">Threshold Configuration</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-primary">{budget.value}</span>
                  <span className="text-sm font-bold text-muted ml-1">{budget.unit}</span>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="range"
                  min={budget.min}
                  max={budget.max}
                  step={budget.step}
                  value={budget.value}
                  onChange={(e) => handleUpdate(budget.id, parseInt(e.target.value))}
                  className="w-full h-3 bg-muted/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] font-black text-muted uppercase tracking-widest">
                  <span>Min: {budget.min}{budget.unit}</span>
                  <span>Max: {budget.max}{budget.unit}</span>
                </div>
              </div>

              <div className="pt-8 border-t border-border-color">
                <div className="flex items-center gap-2 mb-6">
                  <History className="w-4 h-4 text-primary/40" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Historical Context (Last 30D)</h4>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-muted/5 border border-border-color">
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Avg Perf</p>
                    <p className={`text-lg font-black ${isHealthy ? 'text-success' : 'text-critical'}`}>
                      {stats.avg}{budget.unit}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/5 border border-border-color">
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Peak</p>
                    <p className="text-lg font-black text-primary">
                      {stats.max}{budget.unit}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/5 border border-border-color">
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Adherence</p>
                    <p className="text-lg font-black text-primary">
                      {stats.adherence}%
                    </p>
                  </div>
                </div>

                {!isHealthy && (
                  <div className="mt-6 flex items-start gap-3 p-4 rounded-2xl bg-critical/5 border border-critical/20">
                    <AlertTriangle className="w-5 h-5 text-critical shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-black text-critical uppercase tracking-tight">Budget Risk Detected</p>
                      <p className="text-xs font-medium text-critical/70 leading-relaxed">
                        Your current average ({stats.avg}{budget.unit}) exceeds the proposed budget. 
                        Consider optimizing assets or increasing the threshold to avoid constant alerts.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hasChanges && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary text-surface px-8 py-6 rounded-3xl shadow-2xl flex items-center gap-8 animate-in slide-in-from-bottom-8 duration-500 z-50 border-4 border-surface/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-surface/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-surface" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.1em]">Unsaved Budget Adjustments</p>
              <p className="text-xs font-medium opacity-60">Changes will impact performance monitoring immediately.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setHasChanges(false)}
              className="px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-surface/10 rounded-xl transition-colors"
            >
              Discard
            </button>
            <button 
              onClick={() => setHasChanges(false)}
              className="bg-surface text-primary px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
            >
              Save Configuration
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
