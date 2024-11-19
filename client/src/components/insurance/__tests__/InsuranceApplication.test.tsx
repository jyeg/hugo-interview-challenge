import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InsuranceApplication } from '../InsuranceForm';

describe('InsuranceApplication', () => {
  it('renders the form with all sections', () => {
    render(<InsuranceApplication />);

    expect(screen.getByText(/Insurance Application/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street/i)).toBeInTheDocument();
    expect(screen.getByText(/Vehicles/i)).toBeInTheDocument();
    expect(screen.getByText(/Additional People/i)).toBeInTheDocument();
  });

  it('submits the form and shows quote or error', async () => {
    render(<InsuranceApplication />);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/Street/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Anytown' } });
    fireEvent.change(screen.getByLabelText(/State/i), { target: { value: 'CA' } });
    fireEvent.change(screen.getByLabelText(/Zip Code/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/VIN/i), { target: { value: '1HGCM82633A004352' } });
    fireEvent.change(screen.getByLabelText(/Year/i), { target: { value: '2010' } });
    fireEvent.change(screen.getByLabelText(/Make and Model/i), {
      target: { value: 'Honda Accord' },
    });

    fireEvent.click(screen.getByText(/Submit Application/i));

    await waitFor(() => {
      const quoteElement = screen.queryByText(/Your quoted price:/i);
      const errorElement = screen.queryByText(/Unable to process your application/i);
      expect(quoteElement || errorElement).toBeInTheDocument();
    });
  });
});
