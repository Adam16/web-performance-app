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
  { date: 'Oct 01', total: 0.6, js: 180, css: 40, image: 400, tbt: 150 },
  { date: 'Oct 04', total: 0.7, js: 200, css: 45, image: 450, tbt: 180 },
  { date: 'Oct 08', total: 0.8, js: 220, css: 50, image: 550, tbt: 200 },
  { date: 'Oct 12', total: 0.75, js: 210, css: 48, image: 500, tbt: 190 },
  { date: 'Oct 15', total: 0.9, js: 240, css: 55, image: 600, tbt: 220 },
  { date: 'Oct 18', total: 1.2, js: 300, css: 70, image: 800, tbt: 350 },
  { date: 'Oct 22', total: 1.1, js: 280, css: 65, image: 750, tbt: 300 },
  { date: 'Oct 25', total: 1.45, js: 365, css: 85, image: 1000, tbt: 450 },
  { date: 'Oct 29', total: 1.2, js: 320, css: 75, image: 800, tbt: 380 },
  { date: 'Nov 02', total: 1.15, js: 310, css: 72, image: 780, tbt: 360 },
  { date: 'Nov 05', total: 1.1, js: 300, css: 70, image: 750, tbt: 340 },
];
