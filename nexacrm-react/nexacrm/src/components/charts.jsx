import { MONTHS } from '../data/seed';
import { inr } from '../utils/format';

export function LineChart({ data }) {
  const W = 600, H = 220, p = 28, mx = Math.max(...data) * 1.1;
  const x = (i) => p + (i * (W - 2 * p)) / (data.length - 1);
  const y = (v) => H - p - (v / mx) * (H - 2 * p);
  const pts = data.map((v, i) => `${x(i)},${y(v)}`).join('L');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Sales trend">
      <path d={`M${pts}L${x(data.length - 1)},${H - p}L${p},${H - p}Z`} fill="#6366f1" opacity=".12" />
      <path d={`M${pts}`} fill="none" stroke="#6366f1" strokeWidth="2.5" />
      {data.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="#6366f1"><title>{MONTHS[i]}: {inr(v)}</title></circle>)}
      {MONTHS.map((m, i) => i % 2 === 0 && <text key={m} x={x(i)} y={H - 8} fontSize="11" textAnchor="middle" fill="#94a3b8">{m}</text>)}
    </svg>
  );
}

export function DonutChart({ parts }) {
  const total = parts.reduce((a, p) => a + p.value, 0), r = 60, C = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 160 160" width="160" role="img" aria-label="Lead status split">
      {parts.map((p) => {
        const len = total ? (p.value / total) * C : 0;
        const el = <circle key={p.label} cx="80" cy="80" r={r} fill="none" stroke={p.color} strokeWidth="22" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} transform="rotate(-90 80 80)" />;
        offset += len;
        return el;
      })}
      <text x="80" y="87" textAnchor="middle" fontSize="24" fontWeight="700" fill="currentColor">{total}</text>
    </svg>
  );
}

export function BarList({ items }) {
  const mx = Math.max(...items.map((i) => i.value), 1);
  return items.map((i) => (
    <div key={i.label} className="my-2 grid grid-cols-[100px_1fr_auto] items-center gap-2 text-sm">
      <span>{i.label}</span>
      <div className="h-2.5 rounded-full bg-indigo-100 dark:bg-slate-800"><div className="h-full rounded-full bg-indigo-600" style={{ width: `${(i.value / mx) * 100}%` }} /></div>
      <b>{i.text ?? i.value}</b>
    </div>
  ));
}
