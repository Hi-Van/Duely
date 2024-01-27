import { useFetch } from "./fetch.hook";
import { api } from "@/config/api.config";

interface LoginBody {
  email?: string;
  username: string;
  password: string;
}

interface LoginData {
  token: string;
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
