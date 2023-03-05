import { createContext, useContext } from "react";

import type { Language } from "@sanakirja/shared";

type SettingsContextType = {
  mode?: Language;
  error: boolean;
  isLoading: boolean;
  setMode: (mode: Language) => void;
};

const SettingsContext = createContext<SettingsContextType>({
  mode: "finnish",
  error: false,
  isLoading: true,
  setMode: () => null,
});

export const SettingsContextProvider = ({
  children,
  ...value
}: {
  children: React.ReactNode;
} & SettingsContextType) => {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("You need to wrap with SettingsContext.");
  }

  return context;
};
