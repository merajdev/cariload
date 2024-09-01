'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { Router } from 'next/router';
import Spinner from '@/components/Spinner';

const OwnerDashboard: FC = () => {
  const router = useRouter();
  const { isAuthenticated, userRole, isLoading } = useAuth();

  // Optionally show a loading state while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="w-12 h-12" color="#3498db" />
        {/* Customize size and color */}
      </div>
    );
  }

  // Redirect if not authenticated or if user is not an owner
  if (!isAuthenticated || userRole !== 'owner') {
    router.push('/')
    return null; // The user will be redirected by `useAuth`, so this can be null or a different UI
  }

  return (
    <>
      {
        isLoading &&
        (<div className="min-h-screen flex items-center justify-center">
          <Spinner size="w-12 h-12" color="#3498db" />
          {/* Customize size and color */}
        </div>)
      }
      <h1>Owner Dashboard</h1>
    </>
  );
};

export default OwnerDashboard;
