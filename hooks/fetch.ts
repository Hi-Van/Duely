// Base fetch function that all swr hooks will use
export type FetchResponse<Data, Error> = {
  data: Data | undefined;
  isLoading: boolean;
  error: Error | undefined;
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const fetcher = async <T, Body = any, Headers = any>(
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
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
