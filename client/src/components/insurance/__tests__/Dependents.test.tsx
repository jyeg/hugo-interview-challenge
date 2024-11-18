import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { DependentForm } from '../Dependents';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      additionalPeople: [],
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('DependentForm', () => {
  it('renders add person button', () => {
    render(
      <TestWrapper>
        <DependentForm />
      </TestWrapper>
    );

    expect(screen.getByText(/Add Person/i)).toBeInTheDocument();
  });

  it('allows adding a new person', () => {
    render(
      <TestWrapper>
        <DependentForm />
      </TestWrapper>
    );

    fireEvent.click(screen.getByText(/Add Person/i));

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Relationship/i)).toBeInTheDocument();
  });
});
