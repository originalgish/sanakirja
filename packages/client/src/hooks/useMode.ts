import { useCallback } from "react";
import useSWR from "swr";

import { api } from "api";

import { Language } from "@sanakirja/shared";

type ModeResponse = { mode: Language };

const getMode = () => api.get<ModeResponse>("/settings").then(({ data }) => data);

const putMode = (mode: Language) => api.put("/settings/set_mode", { mode });

export const useMode = () => {
  const { data: mode, error, isLoading, isValidating, mutate } = useSWR<ModeResponse>("mode", getMode);

  const setMode = useCallback(
    async (value: Language) => {
      await putMode(value);
      mutate({ mode: value });
    },
    [mutate],
  );

  return {
    mode: mode?.mode,
    error,
    isLoading: isLoading || isValidating,
    setMode,
  };
};
