import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Login from '../components client/Login';

const useAuth = () => {
  return localStorage.getItem('userLogin');
};

const useSession = () => {
  const session = useAuth();
  const decodeSession = session ? jwt_decode(session) : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate('/login', { replace: true });
    }
  }, [navigate, session]);
  return decodeSession;
};

export default function ProtectedRoutes() {
  const isAuthorized = useAuth();
  useSession();

  return isAuthorized ? <Outlet /> : <Login />;
}
