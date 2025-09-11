// Bundle optimization utilities and constants

// Lazy import wrapper for code splitting
export const lazyImport = (importFn, componentName = 'default') => {
  return React.lazy(async () => {
    const module = await importFn();
    return { default: module[componentName] };
  });
};

// Dynamic imports for large dependencies
export const loadYamlLib = () => import('js-yaml');
export const loadLucideIcons = () => import('lucide-react');

// Preload critical resources
export const preloadCriticalAssets = () => {
  // Preload commonly used icons
  const iconNames = ['Plus', 'Download', 'Upload', 'Trash2', 'Copy', 'Settings'];
  
  iconNames.forEach(iconName => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = `/static/js/lucide-${iconName.toLowerCase()}.js`;
    document.head.appendChild(link);
  });
};

// Minimize re-renders with stable object references
export const STABLE_EMPTY_ARRAY = [];
export const STABLE_EMPTY_OBJECT = {};

// Memoization utilities
export const createStableCallback = (dependencies) => {
  const stableDeps = JSON.stringify(dependencies);
  const cache = new Map();
  
  return (fn) => {
    if (!cache.has(stableDeps)) {
      cache.set(stableDeps, fn);
    }
    return cache.get(stableDeps);
  };
};

// Efficient object comparison for React.memo
export const shallowEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  
  return true;
};

// Virtual scrolling utilities for large lists
export const calculateVisibleItems = (containerHeight, itemHeight, scrollTop, totalItems) => {
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
  const endIndex = Math.min(
    totalItems - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + 2
  );
  
  return { startIndex, endIndex, visibleCount: endIndex - startIndex + 1 };
};

// Optimize large object operations
export const batchUpdates = (updates, batchSize = 50) => {
  const batches = [];
  for (let i = 0; i < updates.length; i += batchSize) {
    batches.push(updates.slice(i, i + batchSize));
  }
  return batches;
};

// Web Workers for heavy computations
export const createYamlWorker = () => {
  const workerCode = `
    importScripts('https://cdn.skypack.dev/js-yaml');
    
    self.onmessage = function(e) {
      const { id, type, data } = e.data;
      
      try {
        let result;
        switch(type) {
          case 'parse':
            result = jsyaml.load(data);
            break;
          case 'stringify':
            result = jsyaml.dump(data);
            break;
          default:
            throw new Error('Unknown operation type');
        }
        
        self.postMessage({ id, success: true, result });
      } catch (error) {
        self.postMessage({ id, success: false, error: error.message });
      }
    };
  `;
  
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
};

// Resource prefetching
export const prefetchRoute = (routePath) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = routePath;
  document.head.appendChild(link);
};

// Service Worker registration for caching
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  }
};