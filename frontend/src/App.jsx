import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Gallery from './gallery/pages/Gallery.jsx';
import Members from './pages/Members.jsx';
import Registration from './pages/Registration.jsx';
import RegistrationSuccess from './pages/RegistrationSuccess.jsx';
import VerifyID from './pages/VerifyID.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminRegistrationDetails from './pages/AdminRegistrationDetails.jsx';
import AllRegistrations from './pages/AllRegistrations.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import FundsAdmin from './pages/FundsAdmin.jsx';
import ReceiptView from './pages/ReceiptView.jsx';
import MandalLocation from './pages/MandalLocation.jsx';
import About from './pages/About.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Gallery (Primary Landing Page) */}
        <Route path="/" element={<Gallery />} />

        {/* Public Members Directory (Read-only for normal users) */}
        <Route path="/members" element={<Members />} />

        {/* Legacy Registration URLs redirect to Members */}
        <Route path="/register" element={<Navigate to="/members" replace />} />
        <Route path="/registration" element={<Navigate to="/members" replace />} />
        <Route path="/registration-success" element={<Navigate to="/members" replace />} />
        <Route path="/id/:uniqueId" element={<VerifyID />} />

        {/* Public funds link redirects to admin login */}
        <Route path="/funds" element={<Navigate to="/admin/login?redirect=%2Fadmin%2Ffunds" replace />} />

        {/* Mandal Location */}
        <Route path="/location" element={<MandalLocation />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* Receipt Views */}
        <Route
          path="/admin/receipt/:id"
          element={
            <ProtectedRoute>
              <ReceiptView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receipt/:id"
          element={
            <ProtectedRoute>
              <ReceiptView />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/registration/:uniqueId"
          element={
            <ProtectedRoute>
              <AdminRegistrationDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/all-registrations"
          element={
            <ProtectedRoute>
              <AllRegistrations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/funds"
          element={
            <ProtectedRoute>
              <FundsAdmin />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-black text-ualg-navy mb-4">404</h1>
                <p className="text-gray-500 mb-6">Page not found.</p>
                <a href="/" className="btn-primary inline-block">Go to Gallery</a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
