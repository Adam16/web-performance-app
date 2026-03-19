import React from 'react';
import { CheckCircle2, ArrowUpRight, ArrowDownRight, Minus, ArrowRight, Zap, Activity, Layout } from 'lucide-react';
import { DEPLOYMENTS, CORE_WEB_VITALS, LIGHTHOUSE_CATEGORIES } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GlobalOverview: React.FC = () => {
  const metrics = [
    { label: 'JavaScript Payload', value: '365', unit: 'KB', status: 'critical', sub: '115KB over limit' },
    { label: 'Total Image Size', value: '1.1', unit: 'MB', status: 'warning', sub: 'Nearing 1.2MB limit' },
    { label: 'API Latency (p95)', value: '240', unit: 'ms', status: 'success' },
    { label: 'Server Response', value: '180', unit: 'ms', status: 'success' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-success';
    if (score >= 0.5) return 'text-warning';
    return 'text-critical';
  };

  const getVitalIcon = (id: string) => {
    switch (id) {
      case 'lcp': return <Zap className="w-4 h-4" />;
      case 'inp': return <Activity className="w-4 h-4" />;
      case 'cls': return <Layout className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 bg-surface border border-border-color rounded-2xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-warning to-critical opacity-20" />
        <p className="text-muted uppercase tracking-[0.1em] text-xs font-bold mb-6">Overall Health Score</p>
        <div className="flex items-baseline gap-2">
          <h2 className="font-display font-bold text-[140px] leading-none text-primary tracking-tighter">92</h2>
          <span className="font-display text-5xl text-muted/40 font-light">/100</span>
        </div>
        <div className="mt-10 flex items-center gap-2 text-success bg-success/10 px-6 py-2 rounded-full text-sm font-bold border border-success/20 shadow-sm">
          <CheckCircle2 className="w-4 h-4" />
          Within Budget Parameters
        </div>
      </section>

      {/* Core Web Vitals Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CORE_WEB_VITALS.map((vital) => (
          <div key={vital.id} className="bg-surface border border-border-color rounded-2xl p-6 hover:shadow-lg transition-all border-l-4" style={{ borderLeftColor: vital.status === 'Good' ? '#10b981' : vital.status === 'Needs Improvement' ? '#f59e0b' : '#ef4444' }}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-muted">
                {getVitalIcon(vital.id)}
                <span className="text-[10px] font-black uppercase tracking-widest">{vital.id}</span>
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase px-2 py-0.5 rounded-full",
                vital.status === 'Good' ? "bg-success/10 text-success" :
                vital.status === 'Needs Improvement' ? "bg-warning/10 text-warning" :
                "bg-critical/10 text-critical"
              )}>
                {vital.status}
              </span>
            </div>
            <h3 className="text-sm font-bold text-primary mb-1">{vital.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-primary">{vital.value}</span>
              <span className="text-sm font-bold text-muted">{vital.unit}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Lighthouse Summary */}
      <section className="bg-surface border border-border-color rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h3 className="font-display font-bold text-xl text-primary mb-1">Lighthouse Performance</h3>
            <p className="text-xs text-muted font-medium uppercase tracking-widest">Aggregate scores from latest audit</p>
          </div>
          <div className="flex items-center gap-8">
            {LIGHTHOUSE_CATEGORIES.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center">
                <div className={cn("text-2xl font-black mb-1", getScoreColor(cat.score))}>
                  {Math.round(cat.score * 100)}
                </div>
                <div className="text-[9px] font-black uppercase tracking-tighter text-muted">
                  {cat.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-1.5 w-full bg-muted/10 rounded-full flex overflow-hidden">
          {LIGHTHOUSE_CATEGORIES.map((cat) => (
            <div 
              key={cat.id}
              className={cn(
                "h-full transition-all duration-1000",
                cat.score >= 0.9 ? "bg-success" : cat.score >= 0.5 ? "bg-warning" : "bg-critical"
              )}
              style={{ width: '25%' }}
            />
          ))}
        </div>
      </section>

      {/* Metric Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="bg-surface border border-border-color rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-[180px] relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-sm text-muted font-bold leading-tight max-w-[120px]">{metric.label}</h3>
              <div className={cn(
                "w-3 h-3 rounded-full ring-4",
                metric.status === 'success' ? "bg-success ring-success/10" :
                metric.status === 'warning' ? "bg-warning ring-warning/10" :
                "bg-critical ring-critical/10 animate-pulse"
              )} />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <p className={cn(
                  "font-display font-bold text-4xl tracking-tight",
                  metric.status === 'critical' ? "text-critical" : "text-primary"
                )}>
                  {metric.value}
                </p>
                <span className="text-lg text-muted font-medium">{metric.unit}</span>
              </div>
              {metric.sub && (
                <p className={cn(
                  "text-[11px] font-bold mt-1 flex items-center gap-1",
                  metric.status === 'critical' ? "text-critical" : "text-warning"
                )}>
                  {metric.status === 'critical' ? <ArrowUpRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  {metric.sub}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Recent Deployments */}
      <section className="bg-surface border border-border-color rounded-2xl shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-border-color flex justify-between items-center bg-background-light/30">
          <h3 className="font-display font-bold text-xl text-primary">Recent Deployments</h3>
          <button className="text-sm text-primary font-bold hover:text-primary/70 flex items-center gap-2 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background-light/50 border-b border-border-color">
                <th className="py-4 px-8 text-[11px] font-bold text-muted uppercase tracking-widest">Build ID</th>
                <th className="py-4 px-8 text-[11px] font-bold text-muted uppercase tracking-widest">Time</th>
                <th className="py-4 px-8 text-[11px] font-bold text-muted uppercase tracking-widest">Trigger</th>
                <th className="py-4 px-8 text-[11px] font-bold text-muted uppercase tracking-widest">Payload Delta</th>
                <th className="py-4 px-8 text-[11px] font-bold text-muted uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color text-sm">
              {DEPLOYMENTS.map((dep, i) => (
                <tr key={i} className="hover:bg-background-light/50 transition-colors cursor-pointer group">
                  <td className="py-5 px-8 font-mono text-primary font-bold">{dep.id}</td>
                  <td className="py-5 px-8 text-muted font-medium">{dep.time}</td>
                  <td className="py-5 px-8 text-primary font-medium">{dep.trigger}</td>
                  <td className="py-5 px-8">
                    <div className={cn(
                      "flex items-center gap-1.5 font-bold",
                      dep.payloadDelta > 0 ? "text-critical" : dep.payloadDelta < 0 ? "text-success" : "text-muted"
                    )}>
                      {dep.payloadDelta > 0 ? <ArrowUpRight className="w-4 h-4" /> : dep.payloadDelta < 0 ? <ArrowDownRight className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                      {dep.payloadDelta > 0 ? `+${dep.payloadDelta}KB` : dep.payloadDelta === 0 ? '0KB' : `${dep.payloadDelta}KB`}
                    </div>
                  </td>
                  <td className="py-5 px-8 text-right">
                    <span className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold border",
                      dep.status === 'Breached' ? "bg-critical/10 text-critical border-critical/20" :
                      dep.status === 'Warning' ? "bg-warning/10 text-warning border-warning/20" :
                      "bg-success/10 text-success border-success/20"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        dep.status === 'Breached' ? "bg-critical" :
                        dep.status === 'Warning' ? "bg-warning" :
                        "bg-success"
                      )} />
                      {dep.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
