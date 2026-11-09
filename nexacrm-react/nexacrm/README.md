# NexaCRM

Responsive CRM frontend: auth, dashboard, customers, leads (Kanban), sales pipeline and admin panel.
Stack: React 18, Vite, React Router, Tailwind CSS. No backend needed (mock auth and localStorage).

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```
Demo login: `admin@crm.com` / `Admin@123` (Admin). Also `riya@crm.com` / `Manager@123`, `aman@crm.com` / `Sales@1234`.
New registrations get the Sales role. Only Admin can open /admin.

## Environment variables (`.env`, copy from `.env.example`)
- `VITE_APP_NAME`: brand name shown in the UI.
- `VITE_API_URL`: optional. If set, data syncs with `GET {url}/db` and `PUT {url}/db`; if empty, localStorage is used.

## Structure
```
src/
  components/  Layout, Modal, FormModal, FormField, KanbanBoard, charts, Badge, StatCard, Skeleton, AuthForm, ProtectedRoute
  context/     AuthContext (mock auth), DataContext (db + actions + activity log), ToastContext
  hooks/       useCrud (add/edit/delete flow), usePageLoading (skeleton delay)
  pages/       Login, Register, Dashboard, Customers, Leads, Pipeline, Admin
  services/    api.js (localStorage or REST)
  data/        seed.js (mock data and constants)
  utils/       validators.js, format.js
```
## Internship Project Information

- **Organization:** Infobharat Interns
- **Internship Program:** Web Development
- **Task ID:** B129
- **Project Name:** NexaCRM – Customer Relationship Management System

## Key Learning Outcomes

- React component-based development
- Responsive UI development
- State management using React Context
- Form validation and error handling
- Customer and lead management interfaces
- Git and GitHub version control

## Project Repository

GitHub: https://github.com/Shubhamsrivastav-221/web-Application-B-129

## Author

**Shubham Srivastav**



