import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useData } from './context/DataContext';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Leads from './pages/Leads';
import Pipeline from './pages/Pipeline';
import Admin from './pages/Admin';

const Public = ({ children }) => (useAuth().user ? <Navigate to="/dashboard" replace /> : children);

export default function App() {
  const { loading } = useData();
  if (loading) return <div className="grid min-h-screen place-items-center text-slate-500">Loading…</div>;
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Public><Login /></Public>} />
        <Route path="/register" element={<Public><Register /></Public>} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/admin" element={<ProtectedRoute roles={['Admin']}><Admin /></ProtectedRoute>} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </HashRouter>
  );
}
