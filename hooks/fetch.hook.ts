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

  return fetch(url, options).then((res) => res.json());
};

export const useFetch = <Data = any, Error = any, Body = any, Headers = any>(
  url: string,
  method: HttpMethod
): FetchResponse<Data, Error, Body, Headers> => {
  const { data, error, isValidating } = useSWR<Data, Error>(url, null);
  const [isInitialized, setIsInitialized] = useState(false);
  return [
    async (body?: Body, headers?: Headers) => {
      mutate(
        url,
        await fetcher<Data, Body, Headers>(url, method, body, headers),
        false
      );
      setIsInitialized(true);
    },
    { data, error, isLoading: isValidating, isInitialized },
  ];
};
