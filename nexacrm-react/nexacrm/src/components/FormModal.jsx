import { useState } from 'react';
import Modal from './Modal';
import FormField from './FormField';
import { validate } from '../utils/validators';

export default function FormModal({ title, fields, initial = {}, onSubmit, onClose, submitLabel = 'Save', danger }) {
  const [v, setV] = useState(() => Object.fromEntries(fields.map((f) => [f.name, initial[f.name] ?? f.options?.[0] ?? ''])));
  const [err, setErr] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const er = validate(fields, v);
    setErr(er);
    if (Object.keys(er).length) return;
    onSubmit(Object.fromEntries(Object.entries(v).map(([k, x]) => [k, typeof x === 'string' ? x.trim() : x])));
  };

  return (
    <Modal title={title} onClose={onClose}>
      <form noValidate onSubmit={submit}>
        {fields.map((f) => <FormField key={f.name} field={f} value={v[f.name]} error={err[f.name]} onChange={(val) => setV({ ...v, [f.name]: val })} />)}
        <div className="mt-2 flex justify-end gap-2">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className={`btn ${danger ? 'btn-danger' : ''}`}>{submitLabel}</button>
        </div>
      </form>
    </Modal>
  );
}
