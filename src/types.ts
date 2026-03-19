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

export type Screen = 'overview' | 'budget' | 'assets' | 'trends';
