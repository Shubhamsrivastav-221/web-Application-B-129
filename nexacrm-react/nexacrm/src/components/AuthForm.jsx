import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from './FormField';
import { useAuth } from '../context/AuthContext';
import { validate } from '../utils/validators';

export default function AuthForm({ mode }) {
  const reg = mode === 'register';
  const { login, register } = useAuth();
  const nav = useNavigate();
  const [v, setV] = useState({ name: '', email: '', password: '', confirm: '' });
  const [err, setErr] = useState({});
  const [formErr, setFormErr] = useState('');
  const [busy, setBusy] = useState(false);

  const fields = useMemo(() => [
    ...(reg ? [{ name: 'name', label: 'Full name', required: true, min: 2 }] : []),
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true, min: reg ? 8 : 0 },
    ...(reg ? [{ name: 'confirm', label: 'Confirm password', type: 'password', required: true }] : []),
  ], [reg]);

  const submit = async (e) => {
    e.preventDefault();
    setFormErr('');
    const er = validate(fields, v);
    if (reg) {
      if (v.password.length >= 8 && !/\d/.test(v.password)) er.password = 'Include at least one number';
      if (v.confirm && v.confirm !== v.password) er.confirm = 'Passwords do not match';
    }
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      if (reg) await register(v); else await login(v.email, v.password);
      nav('/dashboard');
    } catch (x) {
      if (x.field) setErr({ [x.field]: x.message }); else setFormErr(x.message);
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="card w-full max-w-sm p-6">
        <h1 className="text-2xl font-extrabold text-indigo-600">◆ {import.meta.env.VITE_APP_NAME || 'NexaCRM'}</h1>
        <p className="muted mb-4">{reg ? 'Create your account' : 'Sign in to your workspace'}</p>
        <form noValidate onSubmit={submit}>
          {fields.map((f) => <FormField key={f.name} field={f} value={v[f.name]} error={err[f.name]} onChange={(val) => setV({ ...v, [f.name]: val })} />)}
          {formErr && <p className="mb-3 text-sm text-red-500" role="alert">{formErr}</p>}
          <button className="btn w-full" disabled={busy}>{busy ? 'Please wait…' : reg ? 'Create account' : 'Sign in'}</button>
        </form>
        <p className="muted mt-4">{reg ? 'Already registered?' : 'New here?'} <Link className="text-indigo-600" to={reg ? '/login' : '/register'}>{reg ? 'Sign in' : 'Create an account'}</Link></p>
        {!reg && <p className="muted">Demo: admin@crm.com / Admin@123</p>}
      </div>
    </div>
  );
}
