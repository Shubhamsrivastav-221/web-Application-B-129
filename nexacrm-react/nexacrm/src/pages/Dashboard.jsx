import { useData } from '../context/DataContext';
import usePageLoading from '../hooks/usePageLoading';
import StatCard from '../components/StatCard';
import { PageSkeleton } from '../components/Skeleton';
import { LineChart, DonutChart } from '../components/charts';
import { REVENUE_TREND } from '../data/seed';
import { inr } from '../utils/format';

export default function Dashboard() {
  const { db } = useData();
  if (usePageLoading()) return <PageSkeleton />;
  const count = (s) => db.leads.filter((l) => l.status === s).length;
  const rate = db.leads.length ? Math.round((count('Converted') / db.leads.length) * 100) : 0;
  const parts = [{ label: 'New', value: count('New'), color: '#4f46e5' }, { label: 'Contacted', value: count('Contacted'), color: '#d98a06' }, { label: 'Converted', value: count('Converted'), color: '#12a150' }];
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total customers" value={db.customers.length} note={`${db.customers.filter((c) => c.status === 'Active').length} active`} />
        <StatCard label="Total leads" value={db.leads.length} note={`${count('Converted')} converted`} />
        <StatCard label="Revenue (mock data)" value={inr(REVENUE_TREND.reduce((a, b) => a + b, 0))} note="Last 12 months" />
        <StatCard label="Conversion rate" value={`${rate}%`} note="Leads to customers" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card"><h2 className="font-bold">Sales trend</h2><LineChart data={REVENUE_TREND} /></div>
        <div className="card"><h2 className="font-bold">Lead conversion</h2>
          <div className="mt-3 flex flex-wrap items-center gap-6"><DonutChart parts={parts} />
            <div className="text-sm">{parts.map((p) => <p key={p.label}><span style={{ color: p.color }}>●</span> {p.label}: <b>{p.value}</b></p>)}</div></div></div>
      </div>
      <div className="card"><h2 className="font-bold">Recent activity</h2>
        {db.log.slice(0, 5).map((a) => <p key={a.id} className="muted mt-1.5">{a.m} · {a.by} · {new Date(a.t).toLocaleString()}</p>)}</div>
    </div>
  );
}
