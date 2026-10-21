import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from '../components/layout/SiteLayout';
import ScrollToTop from '../components/common/ScrollToTop';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Classroom from '../pages/Classroom';
import AdminCourses from '../pages/AdminCourses';
import AdminUsers from '../pages/AdminUsers';
import AdminMaterials from '../pages/AdminMaterials';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/classroom/:courseId" element={<Classroom />} />

        <Route element={<SiteLayout footer="full" />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
        </Route>

        <Route element={<SiteLayout footer="compact" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Navigate to="/admin/courses" replace />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/materials" element={<AdminMaterials />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
