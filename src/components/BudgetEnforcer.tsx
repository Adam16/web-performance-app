import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export const BudgetEnforcer: React.FC = () => {
  const [budgets, setBudgets] = useState({
    js: 250,
    css: 80,
    image: 1200,
    tbt: 300,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleSliderChange = (key: keyof typeof budgets, value: number) => {
    setBudgets((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const budgetItems = [
    { id: 'js' as const, label: 'JavaScript Volume', sub: 'Maximum allowed size for all concatenated JS bundles.', unit: 'KB', max: 1000 },
    { id: 'css' as const, label: 'CSS Size', sub: 'Global stylesheet limits to prevent render-blocking bloat.', unit: 'KB', max: 500 },
    { id: 'image' as const, label: 'Image Payload', sub: 'Total allowed size for all images loaded on initial render.', unit: 'KB', max: 3000 },
    { id: 'tbt' as const, label: 'Total Blocking Time (TBT)', sub: 'Sum of all time periods where long tasks block the main thread.', unit: 'ms', max: 1000 },
  ];

  return (
    <div className="max-w-3xl mx-auto py-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-black text-primary tracking-tight mb-4">Budget Enforcer</h1>
        <p className="text-muted text-lg leading-relaxed">
          Configure strict payload and performance limits for your application builds. 
          Breaches will be flagged automatically during the CI/CD process.
        </p>
      </div>

      <div className="space-y-16">
        <section>
          <div className="border-b border-border-color pb-4 mb-10">
            <h2 className="font-display text-2xl font-bold text-primary">Payload Budgets</h2>
          </div>
          <div className="space-y-12">
            {budgetItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <label className="block text-base font-bold text-primary mb-1">{item.label}</label>
                  <p className="text-sm text-muted font-medium">{item.sub}</p>
                </div>
                <div className="w-full md:w-[400px] flex items-center gap-6">
                  <div className="flex-1 relative h-6 flex items-center">
                    <div className="absolute w-full h-1.5 bg-border-color rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300" 
                        style={{ width: `${(budgets[item.id] / item.max) * 100}%` }} 
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={item.max}
                      value={budgets[item.id]}
                      onChange={(e) => handleSliderChange(item.id, parseInt(e.target.value))}
                      className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div 
                      className="absolute w-5 h-5 bg-primary border-4 border-surface rounded-full shadow-lg pointer-events-none transition-all duration-300"
                      style={{ left: `calc(${(budgets[item.id] / item.max) * 100}% - 10px)` }}
                    />
                  </div>
                  <div className="relative w-28 shrink-0">
                    <input
                      type="number"
                      value={budgets[item.id]}
                      onChange={(e) => handleSliderChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-full border-2 border-border-color rounded-xl py-2.5 pl-4 pr-10 text-sm font-bold focus:border-primary focus:ring-0 outline-none transition-all text-right bg-surface"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted uppercase tracking-wider">{item.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="border-b border-border-color pb-4 mb-10">
            <h2 className="font-display text-2xl font-bold text-primary">Execution Budgets</h2>
          </div>
          <div className="space-y-12">
            {budgetItems.slice(3).map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <label className="block text-base font-bold text-primary mb-1">{item.label}</label>
                  <p className="text-sm text-muted font-medium">{item.sub}</p>
                </div>
                <div className="w-full md:w-[400px] flex items-center gap-6">
                  <div className="flex-1 relative h-6 flex items-center">
                    <div className="absolute w-full h-1.5 bg-border-color rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300" 
                        style={{ width: `${(budgets[item.id] / item.max) * 100}%` }} 
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={item.max}
                      value={budgets[item.id]}
                      onChange={(e) => handleSliderChange(item.id, parseInt(e.target.value))}
                      className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div 
                      className="absolute w-5 h-5 bg-primary border-4 border-surface rounded-full shadow-lg pointer-events-none transition-all duration-300"
                      style={{ left: `calc(${(budgets[item.id] / item.max) * 100}% - 10px)` }}
                    />
                  </div>
                  <div className="relative w-28 shrink-0">
                    <input
                      type="number"
                      value={budgets[item.id]}
                      onChange={(e) => handleSliderChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-full border-2 border-border-color rounded-xl py-2.5 pl-4 pr-10 text-sm font-bold focus:border-primary focus:ring-0 outline-none transition-all text-right bg-surface"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted uppercase tracking-wider">{item.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Bottom Banner */}
      {hasChanges && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-8 left-[320px] right-8 bg-surface border-2 border-border-color p-5 rounded-2xl shadow-2xl z-20 flex justify-center"
        >
          <div className="max-w-4xl w-full flex items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-warning">
              <AlertTriangle className="w-6 h-6 fill-warning/20" />
              <span className="text-sm font-bold text-primary">Unsaved budget changes detected</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => { setHasChanges(false); }}
                className="px-6 py-2.5 text-sm font-bold text-muted hover:text-primary transition-colors"
              >
                Discard
              </button>
              <button 
                onClick={() => { setHasChanges(false); }}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-surface font-display font-bold text-sm rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
                Enforce Limits
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
