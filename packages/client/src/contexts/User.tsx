import { createContext, useCallback, useContext } from "react";
import type { ReactNode } from "react";
import useSWR from "swr";

import { api } from "api";
import { useAuth } from "contexts";

import type { User, UserPreferences } from "@sanakirja/shared";

const getUser = () => api.get<User>("/users/me").then(({ data }) => data);

const putPreferences = (userId: string, preferences: UserPreferences) =>
  api.put(`/users/${userId}/preferences`, { ...preferences });

type UserContextType = {
  user?: User;
  isLoading: boolean;
  updatePreferences: (preferences: UserPreferences | ((preferences: UserPreferences) => UserPreferences)) => void;
};

const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthed } = useAuth();

  const { data: user, isLoading, isValidating, mutate } = useSWR<User | undefined>(isAuthed ? "user" : null, getUser);

  const updatePreferences = useCallback(
    async (prefs: UserPreferences | ((prefs: UserPreferences) => UserPreferences)) => {
      if (user) {
        const preferences = typeof prefs === "function" ? prefs(user.preferences) : prefs;
        await putPreferences(user._id, preferences);
        mutate({ ...user, preferences });
      }
    },
    [user, mutate],
  );

  return (
    <UserContext.Provider value={{ user, isLoading: isLoading || isValidating, updatePreferences }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
