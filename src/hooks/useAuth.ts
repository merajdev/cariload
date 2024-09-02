'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('authData');

      if (!authData) {
        router.push('/login');
        setIsAuthenticated(false);
        setUserRole(null);
      } else {
        const { role } = JSON.parse(authData);
        setIsAuthenticated(true);
        setUserRole(role);
      }

      setIsLoading(false); // Set loading to false when check is complete
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, userRole, isLoading };
};

export default useAuth;
