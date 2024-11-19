import { useEffect, useState } from 'react';
import { Application } from '@common/lib/types';

const fetchApplicationData = async (id: string): Promise<Application> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/applications/${id}`);

  if (!response.ok) {
    let errorMessage = `Error fetching application data: ${response.status}`;

    if (response.headers.get('content-type')?.includes('application/json')) {
      const errorData = await response.json();
      errorMessage += ` - ${errorData.message}`;
    } else {
      const errorText = await response.text();
      errorMessage += ` - ${errorText}`;
    }

    throw new Error(errorMessage);
  }

  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('Invalid response format. Expected JSON.');
  }

  const data: Application = await response.json();
  return data;
};

export const useApplicationData = (applicationId?: string) => {
  const [data, setData] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (applicationId) {
        setIsLoading(true);
        setError(null);

        try {
          const applicationData = await fetchApplicationData(applicationId);
          setData(applicationData);
        } catch (error) {
          setError(error as Error);
          console.error('Error fetching application data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (applicationId && !isLoading) {
      fetchData();
    }
  }, [applicationId]);

  return { data, isLoading, error };
};
