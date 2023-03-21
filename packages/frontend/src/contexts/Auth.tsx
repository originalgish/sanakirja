import { createContext, useCallback, useContext } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

import { api } from "api";
import { config } from "config";
import { useError } from "contexts";

import type { User } from "@sanakirja/shared";

type UserRequest = Pick<User, "name" | "password">;

const TOKEN_KEY = config.token_key ?? "";
const getTokenFromLS = () => localStorage.getItem(TOKEN_KEY) ?? undefined;
const setTokenToLS = (token: string) => localStorage.setItem(TOKEN_KEY, token);
const removeTokenFromLS = () => localStorage.removeItem(TOKEN_KEY);

const getToken = () => api.get<string>("/users/token").then(({ data }) => data);

const postLogin = ({ name, password }: UserRequest) =>
  api.post<{ user: User; token: string }>("/users/login", { name, password }).then(({ data }) => data);

const postLogout = () => api.post("/users/logout").then(({ data }) => data);

type AuthContextType = {
  token: string | undefined;
  isAuthed: boolean;
  login: ({ name, password }: UserRequest, callback?: VoidFunction) => Promise<void>;
  logout: (callback?: VoidFunction) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { setError } = useError();

  const shouldFetch = getTokenFromLS() !== undefined;
  const { data: token, mutate } = useSWR<string | undefined>(shouldFetch ? "token" : null, getToken, {
    fallbackData: getTokenFromLS(),
    onError: () => {
      localStorage.removeItem(TOKEN_KEY);
      navigate("/login", { replace: true });
    },
  });

  const login = useCallback(
    async ({ name, password }: UserRequest, callback?: VoidFunction) => {
      try {
        const data = await postLogin({
          name,
          password,
        });

        if (data?.token) {
          mutate(data.token);
          setTokenToLS(data.token);
          callback?.();
        }
      } catch (error) {
        setError(error);
      }
    },
    [mutate, setError],
  );

  const logout = useCallback(
    async (callback?: VoidFunction) => {
      try {
        await postLogout();
        mutate(undefined);
        removeTokenFromLS();
        callback?.();
      } catch (error) {
        setError(error);
      }
    },
    [mutate, setError],
  );

  const isAuthed = token !== undefined;

  return <AuthContext.Provider value={{ token, isAuthed, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
