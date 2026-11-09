const TONES = {
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  gray: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
};
const MAP = { New: 'indigo', Prospect: 'indigo', Sales: 'indigo', Contacted: 'amber', Qualified: 'amber', Proposal: 'amber', Manager: 'amber', Converted: 'green', Closed: 'green', Active: 'green', Admin: 'green' };

export default function Badge({ tone, children }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONES[MAP[tone ?? children] || 'gray']}`}>{children}</span>;
}
