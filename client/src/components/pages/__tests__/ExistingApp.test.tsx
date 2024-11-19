import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ExistingApp } from '../ExistingApp';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ applicationId: '123' }),
}));

describe('ExistingApp', () => {
  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/123']}>
        <Routes>
          <Route path="/:applicationId" element={<ExistingApp />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading application data.../i)).toBeInTheDocument();
  });

  it('renders InsuranceApplication with fetched data', async () => {
    render(
      <MemoryRouter initialEntries={['/123']}>
        <Routes>
          <Route path="/:applicationId" element={<ExistingApp />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Insurance Application/i)).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
  });

  it('renders error message when fetching data fails', async () => {
    // Mock the fetch function to return an error response
    globalThis.fetch = jest.fn().mockRejectedValueOnce(new Error('Fetch error'));

    render(
      <MemoryRouter initialEntries={['/123']}>
        <Routes>
          <Route path="/:applicationId" element={<ExistingApp />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error fetching application data/i)).toBeInTheDocument();
    });
  });
});
