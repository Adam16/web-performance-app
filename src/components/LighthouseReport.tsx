import React, { useState } from 'react';
import { LIGHTHOUSE_CATEGORIES, LIGHTHOUSE_AUDITS } from '../constants';
import { CheckCircle2, AlertCircle, XCircle, ChevronRight, ChevronDown, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LighthouseReport: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('performance');

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-success';
    if (score >= 0.5) return 'text-warning';
    return 'text-critical';
  };

  const getScoreBg = (score: number) => {
    if (score >= 0.9) return 'bg-success/10';
    if (score >= 0.5) return 'bg-warning/10';
    return 'bg-critical/10';
  };

  const getScoreBorder = (score: number) => {
    if (score >= 0.9) return 'border-success/20';
    if (score >= 0.5) return 'border-warning/20';
    return 'border-critical/20';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 0.9) return <CheckCircle2 className="w-4 h-4 text-success" />;
    if (score >= 0.5) return <AlertCircle className="w-4 h-4 text-warning" />;
    return <XCircle className="w-4 h-4 text-critical" />;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border-color pb-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-primary tracking-tight leading-tight uppercase italic">Lighthouse Report</h2>
          <p className="text-muted text-lg font-medium">Automated auditing for performance, accessibility, and more.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Last Run</p>
            <p className="text-sm font-bold text-primary">Today, 09:42 AM</p>
          </div>
          <button className="bg-primary text-surface px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
            Run New Audit
          </button>
        </div>
      </header>

      {/* Category Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {LIGHTHOUSE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
            className={cn(
              "bg-surface border-2 rounded-3xl p-6 transition-all duration-300 flex flex-col items-center text-center group",
              expandedCategory === cat.id ? "border-primary shadow-xl scale-105" : "border-border-color hover:border-primary/40"
            )}
          >
            <div className={cn(
              "w-20 h-20 rounded-full border-4 flex items-center justify-center mb-4 relative",
              getScoreBorder(cat.score)
            )}>
              <svg className="w-full h-full -rotate-90 absolute inset-0">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className={cn("opacity-10", getScoreColor(cat.score))}
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray={2 * Math.PI * 34}
                  strokeDashoffset={2 * Math.PI * 34 * (1 - cat.score)}
                  strokeLinecap="round"
                  className={getScoreColor(cat.score)}
                />
              </svg>
              <span className={cn("text-2xl font-black", getScoreColor(cat.score))}>
                {Math.round(cat.score * 100)}
              </span>
            </div>
            <h3 className="text-sm font-black uppercase tracking-tight text-primary mb-1">{cat.title}</h3>
            <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Score</p>
          </button>
        ))}
      </div>

      {/* Audit Details */}
      <div className="space-y-4">
        {LIGHTHOUSE_CATEGORIES.map((cat) => (
          <div 
            key={cat.id}
            className={cn(
              "bg-surface border border-border-color rounded-2xl overflow-hidden transition-all duration-500",
              expandedCategory === cat.id ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            )}
          >
            <div className="p-8 border-b border-border-color bg-background-light/30">
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", getScoreBg(cat.score), getScoreColor(cat.score))}>
                  {cat.title}
                </div>
                <h3 className="text-xl font-black text-primary uppercase tracking-tight">{cat.title} Audits</h3>
              </div>
              <p className="text-sm text-muted font-medium max-w-2xl">{cat.description}</p>
            </div>

            <div className="divide-y divide-border-color">
              {LIGHTHOUSE_AUDITS.filter(a => a.category === cat.id).map((audit) => (
                <div key={audit.id} className="p-6 hover:bg-background-light/50 transition-colors group">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getScoreIcon(audit.score)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-primary mb-1 group-hover:text-primary/80 transition-colors">
                          {audit.title}
                        </h4>
                        <p className="text-xs text-muted font-medium leading-relaxed max-w-3xl">
                          {audit.description}
                        </p>
                      </div>
                    </div>
                    {audit.displayValue && (
                      <div className={cn("text-sm font-black whitespace-nowrap", getScoreColor(audit.score))}>
                        {audit.displayValue}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations Section */}
      <div className="bg-primary text-surface rounded-3xl p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Info className="w-6 h-6 text-warning" />
            <h3 className="text-2xl font-black uppercase italic tracking-tight">Top Opportunities</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-black uppercase tracking-widest">Eliminate render-blocking resources</h4>
                <span className="text-xs font-bold text-warning">Potential Savings: 0.45s</span>
              </div>
              <p className="text-xs text-surface/70 leading-relaxed">
                Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-black uppercase tracking-widest">Properly size images</h4>
                <span className="text-xs font-bold text-warning">Potential Savings: 120 KB</span>
              </div>
              <p className="text-xs text-surface/70 leading-relaxed">
                Serve images that are appropriately-sized to save cellular data and improve load time. Use responsive images or a CDN.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
