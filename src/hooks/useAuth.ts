'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem('authData');

        if (!authData) {
          setIsAuthenticated(false);
          setUserRole(null);
        } else {
          const { role } = JSON.parse(authData);
          setIsAuthenticated(true);
          setUserRole(role);
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setIsLoading(false); // Set loading to false when check is complete
      }
    };

    checkAuth();
  }, [router]);


  return { isAuthenticated, userRole, isLoading, setIsAuthenticated, setUserRole };
};

export default useAuth;
