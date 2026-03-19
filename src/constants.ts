import { Asset, Deployment, TrendData, CoreWebVital, LighthouseCategory, LighthouseAudit, PagePerformance } from './types';

export const KEY_PAGES: PagePerformance[] = [
  { id: 'home', name: 'Home', path: '/', score: 94, lcp: '1.1s', cls: 0.02, inp: '80ms', jsSize: '120KB', status: 'Good' },
  { id: 'search', name: 'Search Results', path: '/search', score: 82, lcp: '2.4s', cls: 0.08, inp: '180ms', jsSize: '240KB', status: 'Needs Improvement' },
  { id: 'article', name: 'Article Detail', path: '/article/:id', score: 88, lcp: '1.8s', cls: 0.04, inp: '120ms', jsSize: '180KB', status: 'Good' },
  { id: 'contact', name: 'Contact Us', path: '/contact', score: 96, lcp: '0.9s', cls: 0.01, inp: '60ms', jsSize: '85KB', status: 'Good' },
];

export const LIGHTHOUSE_CATEGORIES: LighthouseCategory[] = [
  { id: 'performance', title: 'Performance', score: 0.92, description: 'Measures how quickly the page loads and becomes interactive.' },
  { id: 'accessibility', title: 'Accessibility', score: 0.98, description: 'Measures how accessible the page is to users with disabilities.' },
  { id: 'best-practices', title: 'Best Practices', score: 1.0, description: 'Measures adherence to web development best practices.' },
  { id: 'seo', title: 'SEO', score: 0.91, description: 'Measures how well the page is optimized for search engines.' },
];

export const LIGHTHOUSE_AUDITS: LighthouseAudit[] = [
  { id: 'first-contentful-paint', title: 'First Contentful Paint', score: 0.95, displayValue: '1.2 s', category: 'performance', description: 'First Contentful Paint marks the time at which the first text or image is painted.' },
  { id: 'speed-index', title: 'Speed Index', score: 0.88, displayValue: '1.8 s', category: 'performance', description: 'Speed Index shows how quickly the contents of a page are visibly populated.' },
  { id: 'largest-contentful-paint', title: 'Largest Contentful Paint', score: 0.92, displayValue: '2.1 s', category: 'performance', description: 'Largest Contentful Paint marks the time at which the largest text or image is painted.' },
  { id: 'total-blocking-time', title: 'Total Blocking Time', score: 0.98, displayValue: '120 ms', category: 'performance', description: 'Sum of all time periods between FCP and Time to Interactive where task length exceeded 50ms.' },
  { id: 'cumulative-layout-shift', title: 'Cumulative Layout Shift', score: 0.85, displayValue: '0.12', category: 'performance', description: 'Cumulative Layout Shift measures the movement of visible elements within the viewport.' },
  { id: 'aria-allowed-attr', title: 'ARIA attributes are allowed for an element\'s role', score: 1.0, category: 'accessibility', description: 'Each ARIA `role` supports a specific subset of `aria-*` attributes.' },
  { id: 'color-contrast', title: 'Background and foreground colors have a sufficient contrast ratio', score: 0.95, category: 'accessibility', description: 'Low-contrast text is difficult or impossible for many users to read.' },
  { id: 'image-alt', title: 'Image elements have [alt] attributes', score: 1.0, category: 'accessibility', description: 'Informative elements should aim for short, descriptive alternate text.' },
];

export const CORE_WEB_VITALS: CoreWebVital[] = [
  {
    id: 'lcp',
    name: 'Largest Contentful Paint',
    value: 2.1,
    unit: 's',
    status: 'Good',
    thresholds: { good: 2.5, poor: 4.0 },
    description: 'Measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.'
  },
  {
    id: 'inp',
    name: 'Interaction to Next Paint',
    value: 180,
    unit: 'ms',
    status: 'Good',
    thresholds: { good: 200, poor: 500 },
    description: 'Measures responsiveness. To provide a good user experience, pages should have an INP of 200 milliseconds or less.'
  },
  {
    id: 'cls',
    name: 'Cumulative Layout Shift',
    value: 0.12,
    unit: '',
    status: 'Needs Improvement',
    thresholds: { good: 0.1, poor: 0.25 },
    description: 'Measures visual stability. To provide a good user experience, pages should maintain a CLS of 0.1. or less.'
  }
];

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
