import { useRef, useState } from 'react';
import Badge from './Badge';
import { inr } from '../utils/format';

// Drag-and-drop board. The dropdown on each card is a touch-friendly alternative to dragging.
export default function KanbanBoard({ items, columns, groupKey, renderCard, onMove, showTotal }) {
  const [over, setOver] = useState(null);
  const dragId = useRef(null);
  return (
    <div className="grid auto-cols-[minmax(250px,1fr)] grid-flow-col gap-3 overflow-x-auto pb-2">
      {columns.map((c) => {
        const list = items.filter((i) => i[groupKey] === c);
        return (
          <div key={c} onDragOver={(e) => { e.preventDefault(); setOver(c); }} onDragLeave={() => setOver(null)}
            onDrop={(e) => { e.preventDefault(); setOver(null); if (dragId.current) onMove(dragId.current, c); dragId.current = null; }}
            className={`min-h-[220px] rounded-xl bg-indigo-50 p-2.5 dark:bg-slate-800/60 ${over === c ? 'outline-dashed outline-2 outline-indigo-500' : ''}`}>
            <div className="mb-2 flex items-center gap-2"><b>{c}</b><Badge tone={c}>{list.length}</Badge>
              {showTotal && <span className="muted">{inr(list.reduce((a, i) => a + i.value, 0))}</span>}</div>
            {list.map((item) => (
              <div key={item.id} draggable onDragStart={() => { dragId.current = item.id; }} className="card mb-2 grid cursor-grab gap-1 p-2.5">
                {renderCard(item)}
                <select className="input mt-1 py-1 text-xs" value={item[groupKey]} aria-label="Move to" onChange={(e) => onMove(item.id, e.target.value)}>
                  {columns.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            {!list.length && <p className="muted">Drop items here</p>}
          </div>
        );
      })}
    </div>
  );
}
