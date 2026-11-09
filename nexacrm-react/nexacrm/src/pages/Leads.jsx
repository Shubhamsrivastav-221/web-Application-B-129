import { useData } from '../context/DataContext';
import useCrud from '../hooks/useCrud';
import usePageLoading from '../hooks/usePageLoading';
import KanbanBoard from '../components/KanbanBoard';
import Badge from '../components/Badge';
import { Skeleton } from '../components/Skeleton';
import { LEAD_STATUSES, SOURCES } from '../data/seed';

const FIELDS = [
  { name: 'name', label: 'Lead name', required: true, min: 2 },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'source', label: 'Source', options: SOURCES },
  { name: 'status', label: 'Status', options: LEAD_STATUSES },
];

export default function Leads() {
  const { db, update } = useData();
  const loading = usePageLoading();
  const crud = useCrud({ coll: 'leads', label: 'lead', nameKey: 'name', fields: FIELDS });
  if (loading) return <Skeleton className="h-96" />;

  const move = (id, status) => {
    const l = db.leads.find((x) => x.id === id);
    if (l && l.status !== status) update('leads', id, { status }, `Moved ${l.name} to ${status}`);
  };
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {LEAD_STATUSES.map((s) => <span key={s} className="flex items-center gap-1.5"><Badge>{s}</Badge><b>{db.leads.filter((l) => l.status === s).length}</b></span>)}
        <div className="flex-1" /><button className="btn" onClick={crud.add}>+ Add lead</button>
      </div>
      <KanbanBoard items={db.leads} columns={LEAD_STATUSES} groupKey="status" onMove={move}
        renderCard={(l) => (<>
          <div className="flex items-center gap-2"><b className="flex-1">{l.name}</b><Badge>{l.status}</Badge></div>
          <p className="muted">{l.email}</p><p className="muted">Source: {l.source}</p>
          <div className="flex gap-1"><button className="btn btn-ghost btn-sm" onClick={() => crud.edit(l)}>Edit</button><button className="btn btn-ghost btn-sm" onClick={() => crud.del(l)}>Delete</button></div>
        </>)} />
      {crud.modal}
    </div>
  );
}
