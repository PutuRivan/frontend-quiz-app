import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import RegisterPage from './pages/register-page.tsx'
import AuthLayout from './layout/auth-layout.tsx'
import LoginPage from './pages/login-page.tsx'
import DashboardLayout from './layout/dashboard-layout.tsx'
import HomeDashboardPage from './pages/home-dashboard-page.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<HomeDashboardPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>,
)
