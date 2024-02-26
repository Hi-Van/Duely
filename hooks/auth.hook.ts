import useSWR from "swr";
import { fetcher, FetchResponse } from "@/hooks/fetch";
import api from "@/config/api.config.json";

type HealthData = {
  status: string | number;
}

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

export const useHealthCheck = (): FetchResponse<HealthData, Error> => {
  const url = api.baseUrl + api.endpoints.auth.health;
  const { data, error, isLoading } = useSWR(url, () => fetcher<HealthData, any, any>(url, "GET"));

  return {
    data,
    error,
    isLoading,
  };
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
  email: string
): FetchResponse<LoginData, Error> => {
  const url = api.baseUrl + api.endpoints.auth.register;
  const { data, error, isLoading } = useSWR(url, () =>
    fetcher<LoginData, LoginBody, any>(url, "POST", {
      username,
      password,
      email,
    })
  );

  return {
    data,
    error,
    isLoading,
  };
};

export const useValidation = () => {
  const url = api.baseUrl + api.endpoints.auth.validate;
  const { data, error, isLoading } = useSWR(url, () =>
    fetcher<ValidationData, any, ValidationHeaders>(url, "GET", undefined, {
      authorization: localStorage.getItem("token") || "",
      "user-id": localStorage.getItem("userId") || "",
    })
  );

  return {
    data,
    error,
    isLoading,
  };
};
