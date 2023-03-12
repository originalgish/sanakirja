import { Divider, Drawer as AntDrawer, Form, Typography } from "antd";

import { SetMode } from "./SetMode";
import { SyncWords } from "./SyncWords";
import { Logout } from "./Logout";
import { useUser } from "contexts";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const Drawer = ({ open, onClose }: Props) => {
  const { user } = useUser();
  return (
    <AntDrawer title="Settings" placement="left" width="260px" onClose={onClose} open={open}>
      <Typography.Text style={{ margin: 0 }}>{`Hey, ${user?.name}!`}</Typography.Text>
      <Divider />

      <Form>
        <Form.Item label="Set mode" name="mode">
          <SetMode />
        </Form.Item>

        <Form.Item>
          <SyncWords />
        </Form.Item>

        <Divider />

        <Form.Item>
          <Logout />
        </Form.Item>
      </Form>
    </AntDrawer>
  );
};
