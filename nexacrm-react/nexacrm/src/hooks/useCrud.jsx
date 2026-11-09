import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import FormModal from '../components/FormModal';

// Reusable add / edit / delete flow for any collection.
export default function useCrud({ coll, label, nameKey, fields, transform = (d) => d }) {
  const { add, update, remove } = useData();
  const toast = useToast();
  const [m, setM] = useState(null);
  const close = () => setM(null);

  let modal = null;
  if (m?.type === 'del') {
    modal = (
      <FormModal title={`Delete “${m.item[nameKey]}”? This can’t be undone.`} fields={[]} submitLabel="Delete" danger onClose={close}
        onSubmit={() => { remove(coll, m.item.id, `Deleted ${label}: ${m.item[nameKey]}`); toast('Deleted'); close(); }} />
    );
  } else if (m) {
    const editing = Boolean(m.item);
    modal = (
      <FormModal title={`${editing ? 'Edit' : 'Add'} ${label}`} fields={typeof fields === 'function' ? fields() : fields} initial={m.item || {}} onClose={close}
        onSubmit={(raw) => {
          const d = transform(raw);
          if (editing) update(coll, m.item.id, d, `Updated ${label}: ${d[nameKey]}`);
          else add(coll, d, `Added ${label}: ${d[nameKey]}`);
          toast(`${label[0].toUpperCase() + label.slice(1)} ${editing ? 'updated' : 'added'}`);
          close();
        }} />
    );
  }
  return { modal, add: () => setM({ type: 'form' }), edit: (item) => setM({ type: 'form', item }), del: (item) => setM({ type: 'del', item }) };
}
