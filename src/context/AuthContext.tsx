'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';

// 1. Update the context type to include both values
const AuthContext = createContext<{
  isAuthenticated: boolean;
  loading: boolean;
}>({
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // 2. Track loading state

  useEffect(() => {
    const checkAuth = () => {
      const customToken = Cookies.get('AuthToken');

      if (session || customToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false); // 3. Done loading
    };

    checkAuth();
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
