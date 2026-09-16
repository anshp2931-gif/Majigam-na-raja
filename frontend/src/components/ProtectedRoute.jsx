// frontend/src/components/ProtectedRoute.jsx
// Verifies admin authentication on the backend before rendering protected pages.

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAdminMe } from '../services/api.js';
import { PageLoading } from './Loading.jsx';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const redirectTarget = `${location.pathname}${location.search}${location.hash}`;

    getAdminMe()
      .then(() => {
        setAuthorized(true);
      })
      .catch(() => {
        navigate(`/admin/login?redirect=${encodeURIComponent(redirectTarget)}`, { replace: true });
      })
      .finally(() => {
        setChecking(false);
      });
  }, [location.hash, location.pathname, location.search, navigate]);

  if (checking) return <PageLoading />;
  if (!authorized) return null;

  return children;
}
