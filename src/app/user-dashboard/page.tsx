'use client';

import { FC } from 'react';
import useAuth from '@/hooks/useAuth';
import Spinner from '@/components/Spinner';
import { SidebarDemo } from './UserDashboard';

const UserDashboard: FC = () => {
  const { isAuthenticated, isLoading, userRole } = useAuth();

  // Optionally show a loading state while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="w-12 h-12" color="#3498db" />
        {/* Customize size and color */}
      </div>
    );
  }

  if (!isAuthenticated || userRole !== 'user') {
    return null; // The user will be redirected, so this can be null or a different UI
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

      <SidebarDemo/>

    </>
  );
};

export default UserDashboard;
