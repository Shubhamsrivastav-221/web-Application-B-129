export default function StatCard({ label, value, note }) {
  return (
    <div className="card">
      <p className="muted">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {note && <p className="muted">{note}</p>}
    </div>
  );
}
