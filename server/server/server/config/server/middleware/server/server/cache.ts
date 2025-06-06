import { LRUCache } from "lru-cache";

// Performance cache for API responses
export const PerformanceCache = new LRUCache<string, any>({
  max: 1000,
  ttl: 1000 * 60 * 5, // 5 minutes
});

// Cache wrapper function
export function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl: number = 1000 * 60 * 5
): Promise<T> {
  const cached = PerformanceCache.get(key);
  if (cached) {
    return Promise.resolve(cached);
  }

  return fn().then((result) => {
    PerformanceCache.set(key, result, { ttl });
    return result;
  });
}

// Add stats method for health checks
PerformanceCache.getStats = function() {
  return {
    size: this.size,
    max: this.max,
    calculatedSize: this.calculatedSize,
  };
};
