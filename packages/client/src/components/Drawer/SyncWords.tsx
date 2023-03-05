import { Button } from "antd";
import useSWRMutation from "swr/mutation";

import { api } from "api";

const syncWords = () => api.post("/words/load");

export const SyncWords = () => {
  const { trigger, isMutating } = useSWRMutation("syncWords", syncWords);

  return (
    <Button type="default" htmlType="button" onClick={() => trigger()} loading={isMutating}>
      Sync words
    </Button>
  );
};
