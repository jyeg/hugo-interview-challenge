import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InsuranceApplication } from '@client/components/insurance/InsuranceApplication';
import { Application } from '@common/lib/types';

// Mock API function
const fetchApplicationData = async (id: string): Promise<Application> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data
  return {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
    },
    vehicles: [{ vin: '1HGCM82633A004352', year: 2010, makeModel: 'Honda Accord' }],
    additionalPeople: [
      { firstName: 'Jane', lastName: 'Doe', dateOfBirth: '1992-05-15', relationship: 'Spouse' },
    ],
  };
};

export function ApplicationPage() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [applicationData, setApplicationData] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplicationData = async () => {
      if (applicationId) {
        try {
          const data = await fetchApplicationData(applicationId);
          setApplicationData(data);
        } catch (error) {
          console.error('Error fetching application data:', error);
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

  return applicationData ? (
    <InsuranceApplication initialData={applicationData} />
  ) : (
    <div>Error: Unable to load application data</div>
  );
}
