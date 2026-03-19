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
  value: number;
}

export type Screen = 'overview' | 'budget' | 'assets' | 'trends';
