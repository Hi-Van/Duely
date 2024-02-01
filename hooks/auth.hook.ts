import { useFetch } from "./fetch.hook";
import { api } from "@/config/api.config";

export interface LoginBody {
  email?: string;
  username: string;
  password: string;
}

export interface LoginData {
  token: string;
  userId: string;
  username: string;
}

export interface ValidationHeaders {
  authorization: string;
  "user-id": string;
}

export interface ValidationData {
  isAuthorized: boolean;
}

export const useGetHealthQuery = () => {
  const [, queryFetch] = useFetch<LoginData, Error, LoginBody>(
    api.baseUrl + api.endpoints.auth.health,
    "GET"
  );

  return queryFetch;
};

export const useGetRegisterMutation = () => {
  return useFetch<LoginData, Error, LoginBody>(
    api.baseUrl + api.endpoints.auth.register,
    "POST"
  );
};

export const useGetLoginMutation = () => {
  return useFetch<LoginData, Error, LoginBody>(
    api.baseUrl + api.endpoints.auth.login,
    "POST"
  );
};

export const useGetValidationQuery = () => {
  return useFetch<ValidationData, Error, null, ValidationHeaders>(api.baseUrl + api.endpoints.auth.validate, "GET");
}
