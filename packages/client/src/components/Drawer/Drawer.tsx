import { Drawer as AntDrawer, Form } from "antd";

import { SetMode } from "./SetMode";
import { SyncWords } from "./SyncWords";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const Drawer = ({ open, onClose }: Props) => {
  return (
    <AntDrawer title="Settings" placement="left" width="260px" onClose={onClose} open={open}>
      <Form>
        <Form.Item label="Set mode" name="mode">
          <SetMode />
        </Form.Item>

        <Form.Item>
          <SyncWords />
        </Form.Item>
      </Form>
    </AntDrawer>
  );
};
