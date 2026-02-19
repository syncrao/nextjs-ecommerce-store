type FetchOptions = {
  method?: string;
  body?: any;
  cache?: RequestCache;
  revalidate?: number;
};

export async function fetcher(route: string, options: FetchOptions = {}) {
  const res = await fetch(route, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache || "no-store",
    next: options.revalidate ? { revalidate: options.revalidate } : undefined,
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}
