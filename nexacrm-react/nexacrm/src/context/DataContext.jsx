import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { seed } from '../data/seed';
import { loadDb, saveDb } from '../services/api';
import { uid } from '../utils/format';

const Ctx = createContext(null);
export const useData = () => useContext(Ctx);

export function DataProvider({ children }) {
  const [db, setDb] = useState(null);
  const actor = useRef('System');

  useEffect(() => { loadDb().then((d) => setDb(d || seed())); }, []);
  useEffect(() => { if (db) saveDb(db); }, [db]);

  // Apply a change to db and (optionally) append an activity log entry.
  const commit = (fn, msg) =>
    setDb((d) => {
      const next = fn(d);
      return msg ? { ...next, log: [{ id: uid(), m: msg, by: actor.current, t: Date.now() }, ...next.log].slice(0, 25) } : next;
    });

  const value = {
    db,
    loading: !db,
    setActor: (name) => { actor.current = name; },
    add: (coll, item, msg) => commit((d) => ({ ...d, [coll]: [...d[coll], { id: uid(), ...item }] }), msg),
    update: (coll, id, patch, msg) => commit((d) => ({ ...d, [coll]: d[coll].map((x) => (x.id === id ? { ...x, ...patch } : x)) }), msg),
    remove: (coll, id, msg) => commit((d) => ({ ...d, [coll]: d[coll].filter((x) => x.id !== id) }), msg),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
