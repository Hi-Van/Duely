import useSWR from "swr";
import { fetcher, FetchResponse } from "@/hooks/fetch";
import api from "@/config/api.config.json";

type LoginBody = {
  email?: string;
  username: string;
  password: string;
};

type LoginData = {
  token: string;
  userId: string;
  username: string;
};

type ValidationHeaders = {
  authorization: string;
  "user-id": string;
};

type ValidationData = {
  isAuthorized: boolean;
};

export const useLogin = (
  username: string,
  password: string
): FetchResponse<LoginData, Error> => {
  const url = api.baseUrl + api.endpoints.auth.login;
  const { data, error, isLoading } = useSWR(url, () =>
    fetcher<LoginData, LoginBody, any>(url, "POST", { username, password })
  );

  return {
    data,
    error,
    isLoading,
  };
};

export const useRegistration = (
  username: string,
  password: string,
  email: string,
): FetchResponse<LoginData, Error> => {
  const url = api.baseUrl + api.endpoints.auth.register;
  const { data, error, isLoading } = useSWR(url, () =>
    fetcher<LoginData, LoginBody, any>(url, "POST", { username, password, email })
  );

  return {
    data,
    error,
    isLoading,
  };
};
