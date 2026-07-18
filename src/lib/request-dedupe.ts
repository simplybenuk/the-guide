const CACHE_LIMIT = 100;
const CACHE_TTL_MS = 60_000;

type CacheEntry<T> = {
  fingerprint: string;
  expiresAt: number;
  settled: boolean;
  promise: Promise<T>;
};

export class RequestIdentityConflictError extends Error {}
export class RequestCapacityError extends Error {}

const requestCache = new Map<string, CacheEntry<unknown>>();

export function withRequestDeduplication<T>(
  key: string,
  fingerprint: string,
  operation: () => Promise<T>,
): Promise<T> {
  const now = Date.now();
  for (const [cachedKey, entry] of requestCache) {
    if (entry.settled && entry.expiresAt <= now) requestCache.delete(cachedKey);
  }
  const existing = requestCache.get(key) as CacheEntry<T> | undefined;
  if (existing) {
    if (existing.fingerprint !== fingerprint) throw new RequestIdentityConflictError();
    return existing.promise;
  }

  if (requestCache.size >= CACHE_LIMIT) {
    const settledKey = [...requestCache].find(([, entry]) => entry.settled)?.[0];
    if (!settledKey) throw new RequestCapacityError();
    requestCache.delete(settledKey);
  }

  const promise = operation();
  const entry: CacheEntry<T> = {
    fingerprint,
    expiresAt: Number.POSITIVE_INFINITY,
    settled: false,
    promise,
  };
  requestCache.set(key, entry);
  void promise.then(
    () => {
      entry.settled = true;
      entry.expiresAt = Date.now() + CACHE_TTL_MS;
    },
    () => {
      entry.settled = true;
      entry.expiresAt = Date.now() + CACHE_TTL_MS;
    },
  );
  return promise;
}

export function clearRequestDeduplicationForTests() {
  requestCache.clear();
}
