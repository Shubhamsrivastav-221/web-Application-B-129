import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import useCrud from '../hooks/useCrud';
import usePageLoading from '../hooks/usePageLoading';
import Badge from '../components/Badge';
import StatCard from '../components/StatCard';
import { BarList } from '../components/charts';
import { PageSkeleton } from '../components/Skeleton';
import { ROLES, SOURCES, DEAL_STAGES } from '../data/seed';
import { inr } from '../utils/format';

const FIELDS = [
  { name: 'name', label: 'Full name', required: true, min: 2 },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Temporary password', type: 'password', required: true, min: 8 },
  { name: 'role', label: 'Role', options: ROLES },
];

export default function Admin() {
  const { db, update } = useData();
  const { user } = useAuth();
  const loading = usePageLoading();
  const crud = useCrud({ coll: 'users', label: 'user', nameKey: 'name', fields: FIELDS });
  if (loading) return <PageSkeleton />;

  const stageValue = (s) => db.deals.filter((d) => d.stage === s).reduce((a, d) => a + d.value, 0);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Users" value={db.users.length} />
        {ROLES.map((r) => <StatCard key={r} label={r + 's'} value={db.users.filter((u) => u.role === r).length} />)}
      </div>
      <div className="flex items-center"><h2 className="flex-1 text-lg font-bold">User management</h2><button className="btn" onClick={crud.add}>+ Add user</button></div>
      <div className="card overflow-x-auto p-0">
        <table className="w-full whitespace-nowrap text-left text-sm">
          <thead className="muted"><tr>{['Name', 'Email', 'Role', ''].map((h) => <th key={h} className="p-3 font-semibold">{h}</th>)}</tr></thead>
          <tbody>
            {db.users.map((u) => (
              <tr key={u.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="p-3">{u.name}</td><td className="p-3">{u.email}</td>
                <td className="flex items-center gap-2 p-3"><Badge>{u.role}</Badge>
                  <select className="input w-auto py-1 text-xs" aria-label="Role" value={u.role} disabled={u.id === user.id}
                    onChange={(e) => update('users', u.id, { role: e.target.value }, `Changed role of ${u.name} to ${e.target.value}`)}>
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select></td>
                <td className="p-3">{u.id === user.id ? <span className="muted">You</span> : <button className="btn btn-ghost btn-sm" onClick={() => crud.del(u)}>Remove</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card"><h2 className="font-bold">Leads by source</h2>
          <BarList items={SOURCES.map((s) => ({ label: s, value: db.leads.filter((l) => l.source === s).length }))} />
          <h2 className="mt-4 font-bold">Deal value by stage</h2>
          <BarList items={DEAL_STAGES.map((s) => ({ label: s, value: stageValue(s), text: inr(stageValue(s)) }))} /></div>
        <div className="card"><h2 className="font-bold">Activity overview</h2>
          {db.log.map((a) => <div key={a.id} className="mt-2 text-sm">{a.m}<p className="muted">{a.by} · {new Date(a.t).toLocaleString()}</p></div>)}</div>
      </div>
      {crud.modal}
    </div>
  );
}
