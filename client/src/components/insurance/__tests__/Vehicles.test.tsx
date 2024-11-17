import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { VehicleForm } from '../Vehicles';
import { vehicleSchema } from '@common/lib/schemas';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      vehicles: [{ vin: '', year: undefined, makeModel: '' }],
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('VehicleForm', () => {
  it('renders initial vehicle fields', () => {
    render(
      <TestWrapper>
        <VehicleForm />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/VIN/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Make and Model/i)).toBeInTheDocument();
  });

  it('allows adding a new vehicle', () => {
    render(
      <TestWrapper>
        <VehicleForm />
      </TestWrapper>
    );

    fireEvent.click(screen.getByText(/Add Vehicle/i));

    expect(screen.getAllByLabelText(/VIN/i)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Year/i)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Make and Model/i)).toHaveLength(2);
  });
});
