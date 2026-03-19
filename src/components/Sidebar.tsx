import React from 'react';
import { LayoutDashboard, ShieldCheck, FolderTree, TrendingUp, Gauge, FileText } from 'lucide-react';
import { Screen } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeScreen, onScreenChange }) => {
  const navItems = [
    { id: 'overview' as Screen, label: 'Global Overview', icon: LayoutDashboard },
    { id: 'vitals' as Screen, label: 'Core Web Vitals', icon: Gauge },
    { id: 'lighthouse' as Screen, label: 'Lighthouse Report', icon: FileText },
    { id: 'budget' as Screen, label: 'Budget Enforcer', icon: ShieldCheck },
    { id: 'assets' as Screen, label: 'Asset Breakdown', icon: FolderTree },
    { id: 'trends' as Screen, label: 'Trend Analysis', icon: TrendingUp },
  ];

  return (
    <div className="w-[280px] flex-shrink-0 bg-surface border-r border-border-color flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-border-color">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-surface shadow-lg">
          <Gauge className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg leading-tight text-primary">Clarity</h1>
          <p className="text-muted text-[10px] uppercase tracking-[0.2em] font-bold">Performance</p>
        </div>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
              activeScreen === item.id
                ? "bg-primary text-surface shadow-md"
                : "text-muted hover:bg-background-light hover:text-primary"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeScreen === item.id ? "text-surface" : "text-muted group-hover:text-primary")} />
            <span className="text-sm font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-border-color bg-background-light/50">
        <div className="flex items-center gap-3">
          <img
            alt="User avatar"
            className="w-10 h-10 rounded-full border-2 border-surface shadow-sm"
            src="https://picsum.photos/seed/admin/100/100"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-primary">Admin User</span>
            <span className="text-[11px] text-muted font-medium">Engineering Lead</span>
          </div>
        </div>
      </div>
    </div>
  );
};
