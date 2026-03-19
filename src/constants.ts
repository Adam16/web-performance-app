import { Asset, Deployment, TrendData } from './types';

export const DEPLOYMENTS: Deployment[] = [
  { id: '#a9f2b4c', time: '10 mins ago', trigger: 'Merge pull request #142', payloadDelta: 115, status: 'Breached' },
  { id: '#b38e1d9', time: '2 hours ago', trigger: 'Optimize hero image assets', payloadDelta: -42, status: 'Healthy' },
  { id: '#c74f0a2', time: 'Yesterday, 14:30', trigger: 'Update vendor dependencies', payloadDelta: 12, status: 'Warning' },
  { id: '#d12e9b5', time: 'Yesterday, 09:15', trigger: 'Fix typo in footer', payloadDelta: 0, status: 'Healthy' },
  { id: '#e5f8c33', time: '2 days ago', trigger: 'Initial dashboard layout', payloadDelta: -8, status: 'Healthy' },
];

export const ASSETS: Asset[] = [
  { name: 'app-vendor-bundle.js', type: 'JavaScript', size: 365, budget: 250 },
  { name: 'hero-background-v2.webp', type: 'Image', size: 180, budget: 200 },
  { name: 'main-styles.css', type: 'CSS', size: 45, budget: 100 },
  { name: 'space-grotesk-bold.woff2', type: 'Font', size: 22, budget: 50 },
];

export const TREND_DATA: TrendData[] = [
  { date: 'Oct 01', value: 0.6 },
  { date: 'Oct 04', value: 0.7 },
  { date: 'Oct 08', value: 0.8 },
  { date: 'Oct 12', value: 0.75 },
  { date: 'Oct 15', value: 0.9 },
  { date: 'Oct 18', value: 1.2 },
  { date: 'Oct 22', value: 1.1 },
  { date: 'Oct 25', value: 1.45 },
  { date: 'Oct 29', value: 1.2 },
  { date: 'Nov 02', value: 1.15 },
  { date: 'Nov 05', value: 1.1 },
];
