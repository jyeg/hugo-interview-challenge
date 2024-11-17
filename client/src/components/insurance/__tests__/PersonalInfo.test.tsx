import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { PersonalInfoForm } from '@client/components/insurance/PersonalInfo';
import { applicationSchema } from '@common/lib/schemas';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('PersonalInfoForm', () => {
  it('renders all form fields', () => {
    render(
      <TestWrapper>
        <PersonalInfoForm />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
  });
});
