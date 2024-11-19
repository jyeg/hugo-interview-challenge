import { useParams } from 'react-router-dom';
import { InsuranceForm } from '@client/components/insurance/InsuranceForm';
import { useApplicationData } from '@client/hooks/useApplicationData';

export function ExistingApp() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const { data: applicationData, isLoading, error } = useApplicationData(applicationId);

  if (isLoading) {
    return (
      <div className="text-center h-full flex items-center justify-center">
        Loading application data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center h-full flex items-center justify-center">
        {error.message}
      </div>
    );
  }

  return (
    <>
      <InsuranceForm
        mode="edit"
        initialData={applicationData ?? undefined}
        applicationId={applicationId}
      />
    </>
  );
}
