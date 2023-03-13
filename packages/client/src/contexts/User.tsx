import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import useSWR from "swr";

import { api } from "api";
import { useAuth } from "contexts";

import type { User } from "@sanakirja/shared";

const getUser = () => api.get<User>("/users/me").then(({ data }) => data);

type UserContextType = {
  user?: User;
};

const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthed } = useAuth();

  const { data: user } = useSWR<User | undefined>(isAuthed ? "user" : null, getUser);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
