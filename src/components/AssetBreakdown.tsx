import React, { useState } from 'react';
import { Search, Download, ChevronRight, X, FileCode, ImageIcon, FileText, Type, ChevronLeft } from 'lucide-react';
import { ASSETS } from '../constants';
import { Asset } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AssetBreakdown: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [filter, setFilter] = useState<'All' | 'JavaScript' | 'CSS' | 'Images' | 'Fonts'>('All');

  const filteredAssets = ASSETS.filter(a => {
    if (filter === 'All') return true;
    if (filter === 'Images') return a.type === 'Image';
    if (filter === 'Fonts') return a.type === 'Font';
    return a.type === filter;
  });

  const getIcon = (type: Asset['type']) => {
    switch (type) {
      case 'JavaScript': return <FileCode className="w-5 h-5 text-warning" />;
      case 'CSS': return <FileText className="w-5 h-5 text-success" />;
      case 'Image': return <ImageIcon className="w-5 h-5 text-primary/70" />;
      case 'Font': return <Type className="w-5 h-5 text-muted" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-primary tracking-tight">Asset Breakdown</h2>
          <p className="text-sm text-muted font-medium">Granular audit of specific file sizes and budget allocations.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search files..."
              className="pl-10 pr-4 py-2.5 bg-surface border-2 border-border-color rounded-xl text-sm focus:border-primary focus:ring-0 w-full md:w-64 text-primary font-medium placeholder:text-muted transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface border-2 border-border-color rounded-xl hover:bg-background-light transition-all text-sm font-bold text-primary shadow-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </header>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-bold text-muted mr-3 uppercase tracking-[0.2em]">Filters:</span>
        {['All', 'JavaScript', 'CSS', 'Images', 'Fonts'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold transition-all border-2",
              filter === f 
                ? "bg-primary text-surface border-primary shadow-lg shadow-primary/20" 
                : "bg-surface text-muted border-border-color hover:border-primary/30"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border-color rounded-2xl overflow-hidden shadow-sm flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background-light/50 border-b border-border-color">
                <th className="py-4 px-8 text-[11px] font-bold uppercase tracking-widest text-muted">Asset Name</th>
                <th className="py-4 px-8 text-[11px] font-bold uppercase tracking-widest text-muted">Type</th>
                <th className="py-4 px-8 text-[11px] font-bold uppercase tracking-widest text-muted text-right">Size</th>
                <th className="py-4 px-8 text-[11px] font-bold uppercase tracking-widest text-muted text-right">Budget</th>
                <th className="py-4 px-8 text-[11px] font-bold uppercase tracking-widest text-muted w-1/4">Status</th>
                <th className="py-4 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {filteredAssets.map((asset, i) => {
                const percentage = Math.min(100, (asset.size / asset.budget) * 100);
                const isBreached = asset.size > asset.budget;
                const isWarning = percentage > 85 && !isBreached;

                return (
                  <tr 
                    key={i} 
                    onClick={() => setSelectedAsset(asset)}
                    className="hover:bg-background-light/50 transition-all cursor-pointer group"
                  >
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        {getIcon(asset.type)}
                        <span className="font-bold text-primary text-sm">{asset.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-8 text-sm text-muted font-medium">{asset.type}</td>
                    <td className="py-5 px-8 text-sm font-bold text-primary text-right">{asset.size} KB</td>
                    <td className="py-5 px-8 text-sm text-muted font-medium text-right">{asset.budget} KB</td>
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="h-2 w-32 bg-background-light rounded-full overflow-hidden flex relative border border-border-color">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              isBreached ? "bg-critical" : isWarning ? "bg-warning" : "bg-success"
                            )} 
                            style={{ width: `${percentage}%` }} 
                          />
                        </div>
                        <span className={cn(
                          "text-[11px] font-bold min-w-[50px]",
                          isBreached ? "text-critical" : isWarning ? "text-warning" : "text-success"
                        )}>
                          {isBreached ? `+${asset.size - asset.budget} KB` : `${Math.round(percentage)}%`}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <ChevronRight className="w-5 h-5 text-muted opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-auto border-t border-border-color bg-background-light/30 px-8 py-4 flex items-center justify-between">
          <span className="text-xs text-muted font-medium">Showing {filteredAssets.length} of {ASSETS.length} assets</span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-muted hover:bg-background-light disabled:opacity-30" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-surface text-xs font-bold shadow-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-primary hover:bg-background-light text-xs font-bold">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-primary hover:bg-background-light text-xs font-bold">3</button>
            <button className="p-2 rounded-lg text-primary hover:bg-background-light">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Side Drawer */}
      <AnimatePresence>
        {selectedAsset && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAsset(null)}
              className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[450px] bg-surface shadow-2xl border-l border-border-color z-50 flex flex-col"
            >
              <div className="px-8 py-6 border-b border-border-color flex items-center justify-between bg-background-light/30">
                <h3 className="font-display font-bold text-xl text-primary">Asset Details</h3>
                <button onClick={() => setSelectedAsset(null)} className="text-muted hover:text-primary transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 flex-1 overflow-y-auto space-y-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {getIcon(selectedAsset.type)}
                    <span className="text-[11px] font-bold text-muted uppercase tracking-widest">{selectedAsset.type} Bundle</span>
                  </div>
                  <h4 className="text-2xl font-black text-primary break-all leading-tight">{selectedAsset.name}</h4>
                </div>

                <div className={cn(
                  "border-2 rounded-2xl p-8 flex flex-col gap-2 items-center justify-center text-center shadow-sm",
                  selectedAsset.size > selectedAsset.budget 
                    ? "bg-critical/5 border-critical/20" 
                    : "bg-success/5 border-success/20"
                )}>
                  <span className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.2em]",
                    selectedAsset.size > selectedAsset.budget ? "text-critical" : "text-success"
                  )}>
                    {selectedAsset.size > selectedAsset.budget ? 'Budget Breach' : 'Healthy Asset'}
                  </span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className={cn(
                      "text-6xl font-black tracking-tighter",
                      selectedAsset.size > selectedAsset.budget ? "text-critical" : "text-success"
                    )}>{selectedAsset.size}</span>
                    <span className={cn(
                      "text-xl font-bold",
                      selectedAsset.size > selectedAsset.budget ? "text-critical" : "text-success"
                    )}>KB</span>
                  </div>
                  <span className={cn(
                    "text-sm font-medium mt-2",
                    selectedAsset.size > selectedAsset.budget ? "text-critical/70" : "text-success/70"
                  )}>
                    {selectedAsset.size > selectedAsset.budget 
                      ? `${selectedAsset.size - selectedAsset.budget} KB over allowed ${selectedAsset.budget} KB limit`
                      : `${selectedAsset.budget - selectedAsset.size} KB remaining in budget`}
                  </span>
                </div>

                <div className="space-y-6">
                  <h5 className="text-xs font-bold text-primary uppercase tracking-[0.2em] border-b border-border-color pb-3">Module Breakdown (Top 3)</h5>
                  <div className="space-y-6">
                    {[
                      { name: 'node_modules/lodash/lodash.js', size: 72 },
                      { name: 'node_modules/moment/moment.js', size: 65 },
                      { name: 'node_modules/d3/d3.js', size: 45 },
                    ].map((mod, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-primary truncate pr-4">{mod.name}</span>
                          <span className="text-sm font-medium text-muted">{mod.size} KB</span>
                        </div>
                        <div className="w-full bg-background-light h-1.5 rounded-full overflow-hidden border border-border-color">
                          <div 
                            className="bg-primary/40 h-full rounded-full" 
                            style={{ width: `${(mod.size / selectedAsset.size) * 100}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button className="w-full py-4 bg-primary text-surface rounded-xl font-display font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                    View Full Source Map
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
