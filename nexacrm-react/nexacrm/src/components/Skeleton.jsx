export const Skeleton = ({ className = 'h-24' }) => <div className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 ${className}`} />;

export const PageSkeleton = () => (
  <div className="space-y-4" aria-busy="true">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[0, 1, 2, 3].map((i) => <Skeleton key={i} />)}</div>
    <div className="grid gap-4 lg:grid-cols-2"><Skeleton className="h-64" /><Skeleton className="h-64" /></div>
  </div>
);
