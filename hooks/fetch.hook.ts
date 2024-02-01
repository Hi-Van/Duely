import { useState } from "react";
import useSWR, { mutate } from "swr";

export type FetchResponse<Data, Error, Body, Headers> = [
  (body?: Body, headers?: Headers) => Promise<void>,
  {
    data: Data | undefined;
    isLoading: boolean;
    isInitialized: boolean;
    error: Error | undefined;
  }
];

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const fetcher = <T, Body = any, Headers = any>(
  url: string,
  method: HttpMethod,
  body?: Body,
  headers?: Headers
): Promise<T> => {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options)
  .then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const useFetch = <Data = any, Error = any, Body = any, Headers = any>(
  url: string,
  method: HttpMethod
): FetchResponse<Data, Error, Body, Headers> => {
  const { data, error: swrError, isValidating, mutate } = useSWR<Data, Error>(url, null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return [
    async (body?: Body, headers?: Headers) => {
      try {
        const fetchedData = await fetcher<Data, Body, Headers>(url, method, body, headers);
        mutate(fetchedData, false);
        setIsInitialized(true);
      } catch (error: any) {
        setError(error);
      }
    },
    { data, error: error || swrError, isLoading: isValidating, isInitialized },
  ];
};
