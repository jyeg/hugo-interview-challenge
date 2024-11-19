import { useState } from 'react';
import { Application } from '@common/lib/types';

interface MutationResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  mutate: (data: Application, options?: MutationOptions<T>) => void;
}

interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

const createApplication = async (data: Application): Promise<{ id: string }> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error creating application: ${response.statusText}`);
  }

  return await response.json();
};

const saveApplication = async (applicationId: string, data: Application): Promise<void> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/applications/${applicationId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error saving application: ${response.statusText}`);
  }
};

const submitApplication = async (
  applicationId: string,
  data: Application
): Promise<{ quote: number }> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/applications/${applicationId}/submit`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`Error submitting application: ${response.statusText}`);
  }

  return await response.json();
};

export const useCreateApplication = (): MutationResult<{ id: string }> => {
  const [data, setData] = useState<{ id: string } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (
    applicationData: Application,
    options?: MutationOptions<{ id: string }>
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createApplication(applicationData);
      setData(result);
      options?.onSuccess?.(result);
    } catch (error) {
      setError(error as Error);
      options?.onError?.(error as Error);
    }

    setIsLoading(false);
  };

  return { data, error, isLoading, mutate };
};

export const useSaveApplication = (applicationId?: string): MutationResult<void> => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (applicationData: Application, options?: MutationOptions<void>) => {
    if (!applicationId) return;

    setIsLoading(true);
    setError(null);

    try {
      await saveApplication(applicationId, applicationData);
      options?.onSuccess?.();
    } catch (error) {
      setError(error as Error);
      options?.onError?.(error as Error);
    }

    setIsLoading(false);
  };

  return { data: null, error, isLoading, mutate };
};

export const useSubmitApplication = (applicationId?: string): MutationResult<{ quote: number }> => {
  const [data, setData] = useState<{ quote: number } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (
    applicationData: Application,
    options?: MutationOptions<{ quote: number }>
  ) => {
    if (!applicationId) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await submitApplication(applicationId, applicationData);
      setData(result);
      options?.onSuccess?.(result);
    } catch (error) {
      setError(error as Error);
      options?.onError?.(error as Error);
    }

    setIsLoading(false);
  };

  return { data, error, isLoading, mutate };
};
