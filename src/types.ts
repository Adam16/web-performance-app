export interface Deployment {
  id: string;
  time: string;
  trigger: string;
  payloadDelta: number;
  status: 'Healthy' | 'Warning' | 'Breached';
}

export interface Asset {
  name: string;
  type: 'JavaScript' | 'CSS' | 'Image' | 'Font';
  size: number;
  budget: number;
}

export interface TrendData {
  date: string;
  total: number;
  js: number;
  css: number;
  image: number;
  tbt: number;
}

export type MetricType = 'total' | 'js' | 'css' | 'image' | 'tbt';

export type Screen = 'overview' | 'budget' | 'assets' | 'trends' | 'vitals' | 'lighthouse';

export interface LighthouseCategory {
  id: string;
  title: string;
  score: number;
  description: string;
}

export interface LighthouseAudit {
  id: string;
  title: string;
  score: number;
  displayValue?: string;
  description: string;
  category: string;
}

export interface CoreWebVital {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'Good' | 'Needs Improvement' | 'Poor';
  thresholds: {
    good: number;
    poor: number;
  };
  description: string;
}
