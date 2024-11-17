import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ApplicationPage } from '../Application';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ applicationId: '123' }),
}));

describe('ApplicationPage', () => {
  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/123']}>
        <Routes>
          <Route path="/:applicationId" element={<ApplicationPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading application data.../i)).toBeInTheDocument();
  });

  it('renders InsuranceApplication with fetched data', async () => {
    render(
      <MemoryRouter initialEntries={['/123']}>
        <Routes>
          <Route path="/:applicationId" element={<ApplicationPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Insurance Application/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    });
  });
});
