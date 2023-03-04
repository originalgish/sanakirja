import { useCallback } from "react";
import { Select } from "antd";
import useSWR from "swr";

import { api } from "api";

import { Language, languages } from "@sanakirja/shared";

type ModeResponse = { mode: Language };

const getMode = () => api.get<ModeResponse>("/settings").then(({ data }) => data);

const setMode = (mode: Language) => api.put("/settings/set_mode", { mode });

export const SetMode = () => {
  const { data: mode, error, isLoading, isValidating, mutate } = useSWR<ModeResponse>("mode", getMode);

  const onChange = useCallback(
    async (value: Language) => {
      await setMode(value);
      mutate({ mode: value });
    },
    [mutate],
  );

  if (error) return <p>An error has occurred.</p>;

  return (
    <Select
      value={mode?.mode}
      onChange={onChange}
      loading={isLoading || isValidating}
      disabled={isLoading || isValidating}
      options={languages.map((language) => ({
        value: language,
        label: language,
      }))}
    />
  );
};
