const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s-]{7,15}$/;

// fields: [{ name, label, type, required, min }] -> returns { fieldName: message }
export function validate(fields, values) {
  const errors = {};
  fields.forEach((f) => {
    const v = String(values[f.name] ?? '').trim();
    if (f.required && !v) errors[f.name] = `${f.label} is required`;
    else if (v && f.type === 'email' && !EMAIL.test(v)) errors[f.name] = 'Enter a valid email address';
    else if (v && f.type === 'tel' && !PHONE.test(v)) errors[f.name] = 'Enter a valid phone number';
    else if (v && f.type === 'number' && !(Number(v) > 0)) errors[f.name] = 'Enter an amount greater than 0';
    else if (v && f.min && v.length < f.min) errors[f.name] = `Must be at least ${f.min} characters`;
  });
  return errors;
}
