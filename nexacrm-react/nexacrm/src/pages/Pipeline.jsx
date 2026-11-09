import { useData } from '../context/DataContext';
import useCrud from '../hooks/useCrud';
import usePageLoading from '../hooks/usePageLoading';
import KanbanBoard from '../components/KanbanBoard';
import StatCard from '../components/StatCard';
import { Skeleton } from '../components/Skeleton';
import { DEAL_STAGES } from '../data/seed';
import { inr } from '../utils/format';

export default function Pipeline() {
  const { db, update } = useData();
  const loading = usePageLoading();
  const crud = useCrud({
    coll: 'deals', label: 'deal', nameKey: 'title', transform: (d) => ({ ...d, value: Number(d.value) }),
    fields: () => [
      { name: 'title', label: 'Deal title', required: true },
      { name: 'customer', label: 'Customer', options: db.customers.map((c) => c.name), required: true },
      { name: 'value', label: 'Value (₹)', type: 'number', required: true },
      { name: 'stage', label: 'Stage', options: DEAL_STAGES },
    ],
  });
  if (loading) return <Skeleton className="h-96" />;

  const D = db.deals, sum = (f) => D.filter(f).reduce((a, d) => a + d.value, 0);
  const move = (id, stage) => {
    const d = D.find((x) => x.id === id);
    if (d && d.stage !== stage) update('deals', id, { stage }, `Moved ${d.title} to ${stage}`);
  };
  return (
    <div>
      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open pipeline" value={inr(sum((d) => d.stage !== 'Closed'))} />
        <StatCard label="Closed revenue" value={inr(sum((d) => d.stage === 'Closed'))} />
        <StatCard label="Total deals" value={D.length} />
        <StatCard label="Win rate" value={`${D.length ? Math.round((D.filter((d) => d.stage === 'Closed').length / D.length) * 100) : 0}%`} />
      </div>
      <div className="mb-4 flex items-center gap-3"><p className="muted flex-1">Drag deals between stages, or use the dropdown on each card.</p><button className="btn" onClick={crud.add}>+ Add deal</button></div>
      <KanbanBoard items={D} columns={DEAL_STAGES} groupKey="stage" onMove={move} showTotal
        renderCard={(d) => (<>
          <b>{d.title}</b><p className="muted">{d.customer}</p><p className="text-lg font-bold">{inr(d.value)}</p>
          <div className="flex gap-1"><button className="btn btn-ghost btn-sm" onClick={() => crud.edit(d)}>Edit</button><button className="btn btn-ghost btn-sm" onClick={() => crud.del(d)}>Delete</button></div>
        </>)} />
      {crud.modal}
    </div>
  );
}
