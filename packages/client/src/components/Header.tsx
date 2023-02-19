import { Button, Typography } from "antd";
import useSWRMutation from "swr/mutation";

const fetcher = (url: string) =>
  fetch(url, {
    method: "post",
  });
const BASE_URL = `${process.env.REACT_APP_API_URL}/api/v1/words`;

export const Header = () => {
  const { trigger, isMutating } = useSWRMutation(`${BASE_URL}/load`, fetcher);

  return (
    <header className="header">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Sanakirja
      </Typography.Title>

      <Button type="default" onClick={trigger} loading={isMutating}>
        Load words
      </Button>
    </header>
  );
};
