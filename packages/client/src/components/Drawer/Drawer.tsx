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
  const { user, isAdmin } = useUser();
  return (
    <AntDrawer title="Settings" placement="left" width="260px" onClose={onClose} open={open}>
      <Typography.Text style={{ margin: 0 }}>
        Hey, <b>{user?.name}</b>!
      </Typography.Text>
      <Divider />

      <Form>
        <Form.Item label="Set mode" name="mode">
          <SetMode />
        </Form.Item>

        {isAdmin && (
          <Form.Item>
            <SyncWords />
          </Form.Item>
        )}

        <Divider />

        <Form.Item>
          <Logout />
        </Form.Item>
      </Form>
    </AntDrawer>
  );
};
