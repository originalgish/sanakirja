import { useCallback } from "react";
import { Button } from "antd";
import useSWRMutation from "swr/mutation";

import { api } from "api";

const syncWords = () => api.post("/words/load");

export const SyncWords = () => {
  const { trigger, isMutating } = useSWRMutation("syncWords", syncWords);

  const onSyncWords = useCallback(() => {
    trigger();
  }, [trigger]);

  return (
    <Button type="default" htmlType="button" onClick={onSyncWords} loading={isMutating}>
      Sync words
    </Button>
  );
};
