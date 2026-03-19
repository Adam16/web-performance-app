import React from 'react';
import { KEY_PAGES } from '../constants';
import { ArrowRight, ExternalLink, Gauge, Zap, Layout, Activity, FileCode } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const KeyPagesPerformance: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border-color pb-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-primary tracking-tight leading-tight uppercase italic">Key Pages Overview</h2>
          <p className="text-muted text-lg font-medium">Performance comparison across critical user journeys.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Total Pages Tracked</p>
            <p className="text-sm font-bold text-primary">{KEY_PAGES.length} Critical Routes</p>
          </div>
          <button className="bg-primary text-surface px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
            Add New Route
          </button>
        </div>
      </header>

      {/* Page Performance Grid */}
      <div className="grid grid-cols-1 gap-6">
        {KEY_PAGES.map((page) => (
          <div key={page.id} className="bg-surface border border-border-color rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              {/* Page Info */}
              <div className="flex items-center gap-6 min-w-[240px]">
                <div className={cn(
                  "w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-4",
                  page.status === 'Good' ? "border-success/20 bg-success/5" :
                  page.status === 'Needs Improvement' ? "border-warning/20 bg-warning/5" :
                  "border-critical/20 bg-critical/5"
                )}>
                  <span className={cn(
                    "text-3xl font-black",
                    page.status === 'Good' ? "text-success" :
                    page.status === 'Needs Improvement' ? "text-warning" :
                    "text-critical"
                  )}>
                    {page.score}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-tighter opacity-60">Score</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-primary uppercase tracking-tight mb-1 group-hover:text-primary/80 transition-colors">
                    {page.name}
                  </h3>
                  <div className="flex items-center gap-2 text-muted font-mono text-xs">
                    <ExternalLink className="w-3 h-3" />
                    {page.path}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted">
                    <Zap className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">LCP</span>
                  </div>
                  <p className="text-lg font-black text-primary">{page.lcp}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted">
                    <Layout className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">CLS</span>
                  </div>
                  <p className="text-lg font-black text-primary">{page.cls}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted">
                    <Activity className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">INP</span>
                  </div>
                  <p className="text-lg font-black text-primary">{page.inp}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted">
                    <FileCode className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">JS Size</span>
                  </div>
                  <p className="text-lg font-black text-primary">{page.jsSize}</p>
                </div>
              </div>

              {/* Action */}
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border-color hover:border-primary hover:bg-primary hover:text-surface transition-all duration-300 font-black text-[10px] uppercase tracking-widest">
                Full Report <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface border border-border-color rounded-3xl p-8">
          <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-6 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-warning" />
            Performance Variance
          </h3>
          <p className="text-sm text-muted font-medium mb-6 leading-relaxed">
            The <span className="text-primary font-bold">Search Results</span> page shows a significant performance dip compared to the home page, primarily due to dynamic content rendering and larger JS payloads.
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-muted">Dynamic Hydration Delay</span>
              <span className="text-critical">+1.2s</span>
            </div>
            <div className="w-full h-2 bg-muted/10 rounded-full overflow-hidden">
              <div className="h-full bg-critical w-[70%]" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border-color rounded-3xl p-8">
          <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-success" />
            Optimization Success
          </h3>
          <p className="text-sm text-muted font-medium mb-6 leading-relaxed">
            The <span className="text-primary font-bold">Contact Us</span> page is currently your best performing route after the recent migration to static form generation.
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-muted">Payload Reduction</span>
              <span className="text-success">-45%</span>
            </div>
            <div className="w-full h-2 bg-muted/10 rounded-full overflow-hidden">
              <div className="h-full bg-success w-[45%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
