import { useState } from 'react';
import { useData } from '../context/DataContext';
import useCrud from '../hooks/useCrud';
import usePageLoading from '../hooks/usePageLoading';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { Skeleton } from '../components/Skeleton';
import { inr, initials } from '../utils/format';

const FIELDS = [
  { name: 'name', label: 'Full name', required: true, min: 2 },
  { name: 'company', label: 'Company', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'status', label: 'Status', options: ['Active', 'Inactive'] },
];

export default function Customers() {
  const { db } = useData();
  const loading = usePageLoading();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [profile, setProfile] = useState(null);
  const crud = useCrud({ coll: 'customers', label: 'customer', nameKey: 'name', fields: FIELDS });
  if (loading) return <Skeleton className="h-96" />;

  const rows = db.customers.filter((c) => (!status || c.status === status) && `${c.name} ${c.company} ${c.email}`.toLowerCase().includes(q.toLowerCase()));
  const deals = profile ? db.deals.filter((d) => d.customer === profile.name) : [];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input className="input max-w-xs" type="search" placeholder="Search name, company, email" aria-label="Search customers" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input w-auto" aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option><option>Active</option><option>Inactive</option>
        </select>
        <div className="flex-1" />
        <button className="btn" onClick={crud.add}>+ Add customer</button>
      </div>
      <div className="card overflow-x-auto p-0">
        <table className="w-full whitespace-nowrap text-left text-sm">
          <thead className="muted"><tr>{['Name', 'Company', 'Email', 'Phone', 'Status', ''].map((h) => <th key={h} className="p-3 font-semibold">{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="p-3"><button className="font-semibold text-indigo-600 hover:underline" onClick={() => setProfile(c)}>{c.name}</button></td>
                <td className="p-3">{c.company}</td><td className="p-3">{c.email}</td><td className="p-3">{c.phone}</td>
                <td className="p-3"><Badge>{c.status}</Badge></td>
                <td className="flex gap-1 p-3"><button className="btn btn-ghost btn-sm" onClick={() => crud.edit(c)}>Edit</button><button className="btn btn-ghost btn-sm" onClick={() => crud.del(c)}>Delete</button></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan="6" className="muted p-4">No customers match your search.</td></tr>}
          </tbody>
        </table>
      </div>
      {crud.modal}
      {profile && (
        <Modal title="Customer profile" onClose={() => setProfile(null)}>
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-indigo-600 text-lg font-bold text-white">{initials(profile.name)}</div>
            <div><p className="font-bold">{profile.name}</p><p className="muted">{profile.company}</p><Badge>{profile.status}</Badge></div>
          </div>
          <p className="my-3 text-sm">📧 {profile.email}<br />📞 {profile.phone}</p>
          <h3 className="font-bold">Deals ({deals.length}) · {inr(deals.reduce((a, d) => a + d.value, 0))}</h3>
          {deals.map((d) => <div key={d.id} className="mt-1.5 flex items-center gap-2 text-sm"><span className="flex-1">{d.title}</span><b>{inr(d.value)}</b><Badge>{d.stage}</Badge></div>)}
          {!deals.length && <p className="muted mt-1">No deals yet.</p>}
          <div className="mt-4 flex justify-end gap-2">
            <button className="btn btn-ghost" onClick={() => setProfile(null)}>Close</button>
            <button className="btn" onClick={() => { const c = profile; setProfile(null); crud.edit(c); }}>Edit customer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
