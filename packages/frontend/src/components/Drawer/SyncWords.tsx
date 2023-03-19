import { useCallback } from "react";
import { Button } from "antd";
import useSWRMutation from "swr/mutation";

import { api } from "api";
import { useError } from "contexts";

const syncWords = () => api.post("/words/load");

export const SyncWords = () => {
  const { setError } = useError();
  const { trigger, isMutating } = useSWRMutation("syncWords", syncWords);

  const onSyncWords = useCallback(async () => {
    try {
      await trigger();
    } catch (error) {
      setError(error);
    }
  }, [trigger, setError]);

  return (
    <Button type="default" htmlType="button" onClick={onSyncWords} loading={isMutating}>
      Sync words
    </Button>
  );
};
