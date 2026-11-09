export const inr = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
export const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
export const uid = () => Math.random().toString(36).slice(2, 9);
