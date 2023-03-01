import { MenuOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

type Props = {
  onDrawerOpen: () => void;
};

export const Header = ({ onDrawerOpen }: Props) => {
  return (
    <header className="header">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Sanakirja
      </Typography.Title>

      <Button type="text" icon={<MenuOutlined />} onClick={onDrawerOpen}></Button>
    </header>
  );
};
