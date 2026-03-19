import React from 'react';
import { CORE_WEB_VITALS } from '../constants';
import { Activity, Zap, Layout, Info, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

export const CoreWebVitals: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good': return 'text-emerald-500';
      case 'Needs Improvement': return 'text-amber-500';
      case 'Poor': return 'text-rose-500';
      default: return 'text-muted';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Good': return 'bg-emerald-500/10';
      case 'Needs Improvement': return 'bg-amber-500/10';
      case 'Poor': return 'bg-rose-500/10';
      default: return 'bg-muted/10';
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'lcp': return <Zap className="w-6 h-6" />;
      case 'inp': return <Activity className="w-6 h-6" />;
      case 'cls': return <Layout className="w-6 h-6" />;
      default: return <Info className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border-color pb-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-primary tracking-tight leading-tight uppercase italic">Core Web Vitals</h2>
          <p className="text-muted text-lg font-medium">Real-world performance metrics as measured by the Chrome User Experience Report.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-surface border-2 border-border-color px-6 py-4 rounded-2xl shadow-sm">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Live Monitoring Active</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {CORE_WEB_VITALS.map((vital) => (
          <div key={vital.id} className="bg-surface border-2 border-border-color rounded-3xl p-8 shadow-sm flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <div className={`p-4 rounded-2xl ${getStatusBg(vital.status)} ${getStatusColor(vital.status)}`}>
                {getIcon(vital.id)}
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusBg(vital.status)} ${getStatusColor(vital.status)} border border-current/20`}>
                {vital.status}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-black text-primary mb-2 uppercase tracking-tight">{vital.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-primary">{vital.value}</span>
                <span className="text-xl font-bold text-muted">{vital.unit}</span>
              </div>
            </div>

            <div className="space-y-6 flex-1">
              <div className="relative pt-6">
                <div className="h-2 w-full bg-muted/10 rounded-full flex overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500" 
                    style={{ width: `${(vital.thresholds.good / vital.thresholds.poor) * 100}%` }} 
                  />
                  <div 
                    className="h-full bg-amber-500" 
                    style={{ width: `${((vital.thresholds.poor - vital.thresholds.good) / vital.thresholds.poor) * 100}%` }} 
                  />
                  <div className="h-full bg-rose-500 flex-1" />
                </div>
                
                {/* Current Value Marker */}
                <div 
                  className="absolute top-4 transition-all duration-1000 ease-out"
                  style={{ left: `${Math.min((vital.value / vital.thresholds.poor) * 100, 100)}%` }}
                >
                  <div className="w-1 h-6 bg-primary rounded-full -translate-x-1/2" />
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-primary whitespace-nowrap uppercase tracking-tighter">
                    Current
                  </div>
                </div>

                <div className="flex justify-between mt-4 text-[10px] font-black text-muted uppercase tracking-widest">
                  <span>Good: &lt;{vital.thresholds.good}{vital.unit}</span>
                  <span>Poor: &gt;{vital.thresholds.poor}{vital.unit}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-muted/5 border border-border-color">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-muted shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-muted leading-relaxed">
                    {vital.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-primary text-surface rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-6 uppercase italic tracking-tight">Optimization Strategy</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest mb-1">LCP Optimization</h4>
                  <p className="text-xs font-medium text-surface/60 leading-relaxed">
                    Your LCP is within the good range. To further improve, ensure your hero image is preloaded and critical CSS is inlined.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface/10 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest mb-1">CLS Remediation</h4>
                  <p className="text-xs font-medium text-surface/60 leading-relaxed">
                    Your CLS is currently "Needs Improvement". Check for images without explicit dimensions and dynamically injected content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface border-2 border-border-color rounded-3xl p-10 shadow-sm">
          <h3 className="text-2xl font-black text-primary mb-8 uppercase italic tracking-tight">Field Data vs Lab Data</h3>
          <div className="space-y-6">
            <p className="text-sm font-medium text-muted leading-relaxed">
              The metrics shown above are based on <strong>Field Data</strong> (Chrome User Experience Report), which reflects real-world user experiences over the last 28 days.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-muted/5 border border-border-color">
                <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">P75 Threshold</p>
                <p className="text-lg font-black text-primary">Used for Scoring</p>
              </div>
              <div className="p-5 rounded-2xl bg-muted/5 border border-border-color">
                <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">Sample Size</p>
                <p className="text-lg font-black text-primary">12.4k Sessions</p>
              </div>
            </div>
            <button className="w-full py-4 bg-primary text-surface font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:scale-[1.02] transition-transform">
              View Detailed CrUX Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
