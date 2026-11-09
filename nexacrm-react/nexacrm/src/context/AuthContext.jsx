import { createContext, useContext, useEffect, useState } from 'react';
import { useData } from './DataContext';
import { uid } from '../utils/format';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const read = () => { try { return localStorage.getItem('crm_session'); } catch { return null; } };
const write = (v) => { try { v ? localStorage.setItem('crm_session', v) : localStorage.removeItem('crm_session'); } catch { /* ignore */ } };

// Mock authentication against db.users. Swap these for real API calls later.
export function AuthProvider({ children }) {
  const { db, loading, add, setActor } = useData();
  const [id, setId] = useState(read);
  const user = db?.users.find((u) => u.id === id) || null;
  useEffect(() => { setActor(user?.name || 'System'); }, [user, setActor]);

  const login = async (email, password) => {
    await wait(600);
    const u = db.users.find((x) => x.email === email.trim().toLowerCase() && x.password === password);
    if (!u) throw new Error('Invalid email or password.');
    write(u.id); setId(u.id);
  };
  const register = async ({ name, email, password }) => {
    await wait(600);
    if (db.users.some((x) => x.email === email.trim().toLowerCase())) throw { field: 'email', message: 'An account with this email already exists' };
    const nid = uid();
    add('users', { id: nid, name: name.trim(), email: email.trim().toLowerCase(), password, role: 'Sales' }, 'New user registered');
    write(nid); setId(nid);
  };
  const logout = () => { write(null); setId(null); };

  return <Ctx.Provider value={{ user, loading, login, register, logout }}>{children}</Ctx.Provider>;
}
