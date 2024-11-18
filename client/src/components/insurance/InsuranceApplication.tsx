import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@client/components/ui/button';
import { Form } from '@client/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@client/components/ui/card';
import { PersonalInfoForm } from './PersonalInfo';
import { AddressForm } from './Address';
import { VehicleForm } from './Vehicles';
import { DependentForm } from './Dependents';
import { applicationSchema } from '@common/lib/schemas';
import { Application } from '@common/lib/types';

interface InsuranceApplicationProps {
  initialData?: Application;
  mode: 'create' | 'edit';
  applicationId?: string;
}

export function InsuranceApplication({
  initialData,
  mode,
  applicationId,
}: InsuranceApplicationProps) {
  const navigate = useNavigate();
  const [quotePrice, setQuotePrice] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<Application>({
    resolver: zodResolver(applicationSchema),
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      address: { street: '', city: '', state: '', zipCode: '' },
      vehicles: [{ vin: '', year: undefined, makeModel: '' }],
      additionalPeople: [],
    },
  });

  const handleCreate = async (data: Application) => {
    try {
      const response = await fetch('http://localhost:8000/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create application');

      const result = await response.json();
      // Assuming the API returns an id field
      navigate(`/${result.id}`);
    } catch (error) {
      setErrorMessage('Failed to create application. Please try again.');
      console.error('Error creating application:', error);
    }
  };

  const handleSave = async (data: Application) => {
    if (!applicationId) return;
    setIsSaving(true);
    try {
      const response = await fetch(`http://localhost:8000/applications/${applicationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save application');

      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Failed to save changes. Please try again.');
      console.error('Error saving application:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (data: Application) => {
    if (!applicationId) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:8000/applications/${applicationId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit application');

      const result = await response.json();
      setQuotePrice(result.quote);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Failed to submit application. Please try again.');
      setQuotePrice(null);
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Insurance Application</CardTitle>
        <CardDescription>Please fill out all required information</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(mode === 'create' ? handleCreate : handleSubmit)}
              className="space-y-8"
            >
              <PersonalInfoForm />
              <AddressForm />
              <VehicleForm />
              <DependentForm />
              <div className="flex gap-4">
                {mode === 'edit' && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={methods.handleSubmit(handleSave)}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Progress'}
                  </Button>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  {mode === 'create'
                    ? 'Create Application'
                    : isSubmitting
                      ? 'Submitting...'
                      : 'Submit Application'}
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </CardContent>
      {quotePrice && (
        <CardFooter>
          <div className="w-full p-4 bg-green-100 text-green-800 rounded">
            Your quoted price: ${quotePrice}
          </div>
        </CardFooter>
      )}
      {errorMessage && (
        <CardFooter>
          <div className="w-full p-4 bg-red-100 text-red-800 rounded">{errorMessage}</div>
        </CardFooter>
      )}
    </Card>
  );
}
