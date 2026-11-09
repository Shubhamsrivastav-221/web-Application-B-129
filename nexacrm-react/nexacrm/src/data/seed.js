export const LEAD_STATUSES = ['New', 'Contacted', 'Converted'];
export const DEAL_STAGES = ['Prospect', 'Qualified', 'Proposal', 'Closed'];
export const ROLES = ['Admin', 'Manager', 'Sales'];
export const SOURCES = ['Website', 'Referral', 'Social Media', 'Cold Call'];
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const REVENUE_TREND = [8.2, 9.1, 7.8, 10.4, 11.9, 12.6, 11.2, 13.8, 14.5, 13.1, 15.9, 17.2].map((v) => v * 1e5);

const first = (n) => n.split(' ')[0].toLowerCase();

export const seed = () => ({
  users: [
    { id: 'u1', name: 'Admin User', email: 'admin@crm.com', password: 'Admin@123', role: 'Admin' },
    { id: 'u2', name: 'Riya Sharma', email: 'riya@crm.com', password: 'Manager@123', role: 'Manager' },
    { id: 'u3', name: 'Aman Verma', email: 'aman@crm.com', password: 'Sales@1234', role: 'Sales' },
  ],
  customers: [
    ['Arjun Mehta', 'Nova Textiles'], ['Priya Nair', 'Bluepeak Logistics'], ['Rohan Gupta', 'Greenleaf Foods'],
    ['Sneha Iyer', 'Orbit Systems'], ['Vikram Singh', 'Sagar Pharma'], ['Anita Desai', 'Kiran Estates'],
    ['Karan Malhotra', 'Lumen Studios'], ['Neha Kapoor', 'Vertex Auto'],
  ].map(([name, company], i) => ({
    id: 'c' + i, name, company, email: `${first(name)}@${first(company)}.com`,
    phone: '+91 98' + (76543210 + i * 1111), status: i % 4 === 3 ? 'Inactive' : 'Active',
  })),
  leads: [
    ['Meera Joshi', 'Website', 'New'], ['Dev Patel', 'Referral', 'New'], ['Isha Rao', 'Social Media', 'Contacted'],
    ['Rahul Das', 'Cold Call', 'Contacted'], ['Tanya Bose', 'Website', 'Converted'], ['Sameer Khan', 'Referral', 'New'],
    ['Pooja Menon', 'Website', 'Contacted'], ['Nikhil Jain', 'Social Media', 'Converted'],
  ].map(([name, source, status], i) => ({ id: 'l' + i, name, email: `${first(name)}@mail.com`, source, status })),
  deals: [
    ['ERP rollout', 'Nova Textiles', 480000, 'Prospect'], ['Fleet tracking', 'Bluepeak Logistics', 320000, 'Qualified'],
    ['POS upgrade', 'Greenleaf Foods', 150000, 'Qualified'], ['Cloud migration', 'Orbit Systems', 720000, 'Proposal'],
    ['Compliance suite', 'Sagar Pharma', 410000, 'Proposal'], ['CRM license', 'Kiran Estates', 260000, 'Closed'],
    ['Brand portal', 'Lumen Studios', 190000, 'Closed'],
  ].map(([title, customer, value, stage], i) => ({ id: 'd' + i, title, customer, value, stage })),
  log: [{ id: 'g0', m: 'Workspace created', by: 'System', t: Date.now() }],
});
