import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InsuranceApplication } from '@client/components/insurance/InsuranceApplication';
import { Application } from '@common/lib/types';

const fetchApplicationData = async (id: string): Promise<Application> => {
  const response = await fetch(`http://localhost:8000/applications/${id}`);

  if (!response.ok) {
    throw new Error(`Error fetching application data: ${response.statusText}`);
  }

  return await response.json();
};

export function ApplicationPage() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [applicationData, setApplicationData] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadApplicationData = async () => {
      if (applicationId) {
        try {
          const data = await fetchApplicationData(applicationId);
          setApplicationData(data);
          setError(null);
        } catch (error) {
          console.error('Error fetching application data:', error);
          setError('Failed to load application data');
        } finally {
          setLoading(false);
        }
      }
    };

    loadApplicationData();
  }, [applicationId]);

  if (loading) {
    return <div>Loading application data...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return applicationData ? (
    <InsuranceApplication mode="edit" initialData={applicationData} applicationId={applicationId} />
  ) : null;
}
