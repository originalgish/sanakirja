import { Drawer as AntDrawer, Button, Select, Form } from "antd";

import useSWRMutation from "swr/mutation";

const fetcher = (url: string) =>
  fetch(url, {
    method: "post",
  });
const BASE_URL = `${process.env.REACT_APP_API_URL}/api/v1/words`;

type Props = {
  open: boolean;
  onClose: () => void;
};

export const Drawer = ({ open, onClose }: Props) => {
  const { trigger, isMutating } = useSWRMutation(`${BASE_URL}/load`, fetcher);

  return (
    <AntDrawer title="Settings" placement="left" width="260px" onClose={onClose} open={open}>
      <Form>
        <Form.Item label="Select mode" name="mode">
          <Select
            loading
            disabled
            options={[
              { value: "english", label: "english" },
              { value: "finnish", label: "finnish" },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button type="default" htmlType="button" onClick={trigger} loading={isMutating}>
            Sync words
          </Button>
        </Form.Item>
      </Form>
    </AntDrawer>
  );
};
