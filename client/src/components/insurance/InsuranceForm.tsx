import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { applicationSchema, partialApplicationSchema } from '@common/lib/schemas';
import { Application } from '@common/lib/types';
import {
  useCreateApplication,
  useSaveApplication,
  useSubmitApplication,
} from '@client/hooks/useApplicationMutation';
import { useToast } from '@client/hooks/use-toast';

interface InsuranceApplicationProps {
  initialData?: Application;
  mode: 'create' | 'edit';
  applicationId?: string;
}

export function InsuranceForm({ initialData, mode, applicationId }: InsuranceApplicationProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    mutate: createApplication,
    error: createError,
    isLoading: isCreating,
  } = useCreateApplication();
  const {
    mutate: saveApplication,
    error: saveError,
    isLoading: isSaving,
  } = useSaveApplication(applicationId);
  const {
    mutate: submitApplication,
    error: submitError,
    isLoading: isSubmitting,
  } = useSubmitApplication(applicationId);

  const methods = useForm<Application>({
    resolver: zodResolver(applicationSchema),
    defaultValues: initialData || {
      firstName: undefined,
      lastName: undefined,
      dateOfBirth: undefined,
      address: { street: undefined, city: undefined, state: undefined, zipCode: undefined },
      vehicles: [{ vin: undefined, year: 2024, makeModel: undefined }],
      additionalPeople: [],
    },
  });

  const onSubmit = (data: Application) => {
    if (mode === 'create') {
      createApplication(data, {
        onSuccess: (result) => {
          toast({
            title: 'Success!',
            description: 'Application created successfully.',
            variant: 'default',
          });
          navigate(`/${result.id}`);
        },
        onError: (error) => {
          toast({
            title: 'Error!',
            description: error.message || 'Failed to create application.',
            variant: 'destructive',
          });
        },
      });
    } else {
      submitApplication(data, {
        onSuccess: (result) => {
          toast({
            title: 'Success!',
            description: `Application submitted successfully. Your quote is $${result.quote}.`,
            variant: 'default',
          });
        },
        onError: (error) => {
          toast({
            title: 'Error!',
            description: error.message || 'Failed to submit application.',
            variant: 'destructive',
          });
        },
      });
    }
  };

  const handleSave = (data: Application) => {
    saveApplication(data, {
      onSuccess: () => {
        toast({
          title: 'Success!',
          description: 'Progress saved successfully.',
          variant: 'default',
        });
      },
      onError: () => {
        toast({
          title: 'Error!',
          description: saveError?.message || 'Failed to save progress.',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <div className="h-screen p-4 overflow-hidden">
      <Card className="w-full max-w-4xl mx-auto flex flex-col h-full">
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Insurance Application</CardTitle>
              <CardDescription>Please fill out all required information</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto min-h-0">
              <div className="space-y-6">
                <PersonalInfoForm />
                <AddressForm />
                <VehicleForm />
                <DependentForm />
              </div>
            </CardContent>
            <CardFooter className="flex-shrink-0 border-t bg-card p-6">
              <div className="flex gap-4 w-full">
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
                <Button type="submit" disabled={isCreating || isSubmitting} className="ml-auto">
                  {mode === 'create'
                    ? isCreating
                      ? 'Creating...'
                      : 'Create Application'
                    : isSubmitting
                      ? 'Submitting...'
                      : 'Submit Application'}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
