import { useEffect, useState } from 'react';
// Simulates fetch latency so skeleton loaders are visible; replace with real loading state when using an API.
export default function usePageLoading(ms = 450) {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), ms); return () => clearTimeout(t); }, [ms]);
  return loading;
}
