import { useCallback } from "react";
import { Select } from "antd";
import useSWR from "swr";

import { api } from "api";

type Mode = "finnish" | "english";
type ModeResponse = { mode: Mode };

const getMode = () => api.get<ModeResponse>("/words/get_mode").then(({ data }) => data);

const setMode = (mode: Mode) => api.put("/words/set_mode", { mode });

export const SetMode = () => {
  const { data: mode, error, isLoading, isValidating, mutate } = useSWR<ModeResponse>("mode", getMode);

  const onChange = useCallback(
    async (value: Mode) => {
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
      options={[
        { value: "english", label: "english" },
        { value: "finnish", label: "finnish" },
      ]}
    />
  );
};
