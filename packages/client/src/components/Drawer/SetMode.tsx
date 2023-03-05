import { useCallback } from "react";
import { Select } from "antd";
import { useSettingsContext } from "contexts";

import { Language, languages } from "@sanakirja/shared";

export const SetMode = () => {
  const { mode, error, isLoading, setMode } = useSettingsContext();

  const onChange = useCallback(
    async (value: Language) => {
      setMode(value);
    },
    [setMode],
  );

  if (error) return <p>An error has occurred.</p>;

  return (
    <Select
      value={mode}
      onChange={onChange}
      loading={isLoading}
      disabled={isLoading}
      options={languages.map((language) => ({
        value: language,
        label: language,
      }))}
    />
  );
};
