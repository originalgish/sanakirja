import { useCallback } from "react";
import { Select } from "antd";

import { useUser } from "contexts";

import { languages } from "@sanakirja/shared";
import type { Language } from "@sanakirja/shared";

export const SetMode = () => {
  const { user, isLoading, updatePreferences } = useUser();

  const onChange = useCallback(
    async (mode: Language) => {
      updatePreferences((prevPreferences) => ({ ...prevPreferences, mode }));
    },
    [updatePreferences],
  );

  return (
    <Select
      value={user?.preferences.mode}
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
