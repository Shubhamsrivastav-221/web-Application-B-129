import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Badge from './Badge';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/customers', label: 'Customers', icon: '👥' },
  { to: '/leads', label: 'Leads', icon: '🎯' },
  { to: '/pipeline', label: 'Pipeline', icon: '💼' },
  { to: '/admin', label: 'Admin', icon: '🛡️', roles: ['Admin'] },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const items = NAV.filter((n) => !n.roles || n.roles.includes(user.role));
  const title = items.find((n) => n.to === pathname)?.label || 'NexaCRM';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col gap-1 border-r border-slate-200 bg-white p-3 transition-transform dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-3 pb-4 pt-2 text-xl font-extrabold text-indigo-600">◆ {import.meta.env.VITE_APP_NAME || 'NexaCRM'}</div>
        {items.map((n) => (
          <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)}
            className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-indigo-50 font-bold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            {n.icon} {n.label}
          </NavLink>
        ))}
        <div className="flex-1" />
        <p className="muted px-3">{user.name}<br />{user.email}</p>
        <button className="btn btn-ghost mt-2" onClick={logout}>Log out</button>
      </aside>
      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <button className="btn btn-ghost btn-sm lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>☰</button>
          <h1 className="flex-1 text-lg font-bold">{title}</h1>
          <span className="hidden items-center gap-2 text-sm sm:flex">{user.name} <Badge>{user.role}</Badge></span>
        </header>
        <main className="mx-auto max-w-[1300px] p-4 sm:p-5"><Outlet /></main>
      </div>
    </div>
  );
}
