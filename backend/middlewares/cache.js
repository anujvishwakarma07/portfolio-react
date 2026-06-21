// Simple in-memory cache store
const cacheStore = new Map();

/**
 * Express Middleware to cache API responses
 * @param {string} key - Unique key for the cache entry (e.g. "projects_list")
 * @param {number} durationSeconds - Cache expiry duration in seconds (default: 5 minutes)
 */
export const cacheMiddleware = (key, durationSeconds = 300) => {
  return (req, res, next) => {
    const cached = cacheStore.get(key);

    // 1. If we have a cached copy and it is not expired, return it instantly!
    if (cached && Date.now() < cached.expiry) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Cache-Remaining-Seconds', Math.round((cached.expiry - Date.now()) / 1000));
      return res.json(cached.data);
    }

    // 2. If it is a cache MISS, intercept the response.json call to save it to RAM before sending
    const originalJson = res.json;
    res.json = function(data) {
      // Only cache successful 200 OK responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cacheStore.set(key, {
          data,
          expiry: Date.now() + (durationSeconds * 1000)
        });
      }
      res.setHeader('X-Cache', 'MISS');
      originalJson.call(this, data);
    };

    next();
  };
};

/**
 * Helper to clear a cache key when data changes (CUD operations)
 * @param {string} key - Cache key to invalidate
 */
export const clearCache = (key) => {
  if (cacheStore.has(key)) {
    cacheStore.delete(key);
    console.log(`🧹 Cache cleared for key: "${key}" (Data updated)`);
  }
};
