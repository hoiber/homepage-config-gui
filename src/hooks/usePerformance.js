import { useCallback, useRef } from 'react';

// Performance monitoring and optimization hook
export const usePerformance = () => {
  const timers = useRef(new Map());

  // Start timing an operation
  const startTimer = useCallback((label) => {
    timers.current.set(label, performance.now());
  }, []);

  // End timing and log results
  const endTimer = useCallback((label) => {
    const startTime = timers.current.get(label);
    if (startTime) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
      timers.current.delete(label);
      return duration;
    }
    return 0;
  }, []);

  // Measure function execution time
  const measureAsync = useCallback(async (label, asyncFn) => {
    startTimer(label);
    try {
      const result = await asyncFn();
      endTimer(label);
      return result;
    } catch (error) {
      endTimer(label);
      throw error;
    }
  }, [startTimer, endTimer]);

  // Debounce function for performance optimization
  const debounce = useCallback((func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // Throttle function for scroll/resize events
  const throttle = useCallback((func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  // Memory usage monitoring (if supported)
  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576 * 100) / 100,
        total: Math.round(performance.memory.totalJSHeapSize / 1048576 * 100) / 100,
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576 * 100) / 100
      };
    }
    return null;
  }, []);

  return {
    startTimer,
    endTimer,
    measureAsync,
    debounce,
    throttle,
    getMemoryUsage
  };
};

// Lazy loading utility
export const useLazyLoad = (threshold = 0.1) => {
  const observerRef = useRef(null);

  const observe = useCallback((element, callback) => {
    if (!element) return;

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback(entry.target);
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { threshold }
      );
    }

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.unobserve(element);
      }
    };
  }, [threshold]);

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  return { observe, disconnect };
};