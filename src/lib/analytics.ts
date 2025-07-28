// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-83147HJV4T';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Initialize Google Analytics
export const initGA = (): void => {
  if (!isBrowser) return;
  
  // Add Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const pageview = (url: string): void => {
  if (!isBrowser || !window.gtag) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}): void => {
  if (!isBrowser || !window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Check if analytics is enabled (based on cookie consent)
export const isAnalyticsEnabled = (): boolean => {
  if (!isBrowser) return false;
  return localStorage.getItem('cookie-consent') === 'accepted';
};

// Type definitions for global gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
