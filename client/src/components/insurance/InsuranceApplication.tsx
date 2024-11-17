import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
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

// Mock initial state (replace with actual data fetching in a real application)
const initialState: Application = {
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

export function InsuranceApplication({ initialData }: { initialData?: Application }) {
  const [quotePrice, setQuotePrice] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<Application>({
    resolver: zodResolver(applicationSchema),
    defaultValues: initialData || initialState,
  });

  const onSubmit = (data: Application) => {
    console.log('data', data);
    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setQuotePrice(Math.floor(Math.random() * 1000) + 500);
        setErrorMessage(null);
      } else {
        setErrorMessage('Unable to process your application at this time. Please try again later.');
        setQuotePrice(null);
      }
    }, 1000);
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
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
              <PersonalInfoForm />
              <AddressForm />
              <VehicleForm />
              <DependentForm />
              <Button type="submit">Submit Application</Button>
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
