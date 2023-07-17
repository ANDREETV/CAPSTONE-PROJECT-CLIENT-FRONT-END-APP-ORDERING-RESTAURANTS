import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import CategoryFilters from '../components client/CategoryFilters';

const useAuth = () => {
  return localStorage.getItem('orderMenu');
};

const useSession = () => {
  const session = useAuth();
  const decodeSession = session ? jwt_decode(session) : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate('/', { replace: true });
    }
  }, [navigate, session]);
  return decodeSession;
};

export default function ProtectedOrder() {
  const isAuthorized = useAuth();
  useSession();

  return isAuthorized ? <Outlet /> : <CategoryFilters />;
}
