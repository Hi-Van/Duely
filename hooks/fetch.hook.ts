import { useState } from "react";
import useSWR, { mutate } from "swr";

export type FetchResponse<Data, Error, Body, Headers> = [
  {
    data: Data | undefined;
    isLoading: boolean;
    isInitialized: boolean;
    error: Error | undefined;
  },
  (body?: Body, headers?: Headers) => Promise<void>
];

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const fetcher = <T, Body = any, Headers = any>(
  url: string,
  method: HttpMethod,
  body?: Body,
  headers?: Headers
): Promise<T> =>
  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then((res) => res.json());

export const useFetch = <Data = any, Error = any, Body = any, Headers = any>(
  url: string,
  method: HttpMethod
): FetchResponse<Data, Error, Body, Headers> => {
  const { data, error, isValidating } = useSWR<Data, Error>(url, null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [isInitialized, setIsInitialized] = useState(false);
  return [
    { data, error, isLoading: isValidating, isInitialized },
    async (body?: Body, headers?: Headers) => {
      mutate(
        url,
        await fetcher<Data, Body, Headers>(url, method, body, headers),
        false
      );
      setIsInitialized(true);
    },
  ];
};
