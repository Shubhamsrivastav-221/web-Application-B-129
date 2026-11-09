export default function FormField({ field, value, error, onChange }) {
  const id = 'f-' + field.name;
  const cls = `input ${error ? 'input-error' : ''}`;
  return (
    <div className="mb-3">
      <label htmlFor={id} className="mb-1 block text-xs font-semibold">{field.label}{field.required && ' *'}</label>
      {field.options ? (
        <select id={id} className={cls} value={value} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input id={id} className={cls} type={field.type || 'text'} value={value} onChange={(e) => onChange(e.target.value)} autoComplete="off" aria-invalid={Boolean(error)} />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
