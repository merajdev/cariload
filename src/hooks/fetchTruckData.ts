'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


interface Truck {
    id: number;
    driverId: string;
    truckId: string;
    license: string;
    model: string;
    capacity: number;
    status: 'available' | 'on-trip' | 'under-maintenance';
    maintenance?: {
      lastMaintenance: Date;
      nextMaintenance: Date;
      recentRepairs?: string;
    };
    latitude?: number;
    longitude?: number;
  }
  
const fetchTruckData = (
    setTrucks: (trucks: Truck[]) => void,
    setLoading: (loading: boolean) => void,
    setError: (error: string) => void
) => {
    

  useEffect(() => {

    async function fetchTrucks() {
        try {
          const authData = localStorage.getItem('authData');
  
          if (!authData) {
            setError("An error occurred. Please try again later");
            return;
          }
  
          const parsedAuthData = JSON.parse(authData);
          const { token } = parsedAuthData;
  
          if (!token) {
            setError("An error occurred. Please try again later");
            return;
          }
  
          const response = await fetch('/api/truck', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const result = await response.json();
          const trucksData = result.trucks;
  
          if (!Array.isArray(trucksData)) {
            throw new Error('Expected trucks to be an array');
          }
  
          const transformedTrucks: Truck[] = trucksData.map((truck: any) => ({
            id: truck._id,
            driverId: truck.driverId,
            truckId: truck.truckId,
            license: truck.license,
            model: truck.model,
            capacity: truck.capacity,
            status: truck.status,
            maintenance: truck.maintenance,
            latitude: truck.latitude,
            longitude: truck.longitude,
          }));
          console.log(transformedTrucks[0].truckId);
          setTrucks(transformedTrucks);
  
        } catch (error) {
          console.error(error);
          setError("An error occurred. Please try again later");
        } finally {
          setLoading(false);
        }
  
      }
  
      fetchTrucks();
  
  }, []);


  return {  };
};

export default fetchTruckData;
