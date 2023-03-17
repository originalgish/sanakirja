import { MenuOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import styled from "styled-components";

type Props = {
  onDrawerOpen: () => void;
};

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid #e5e7eb;

  & > h2 {
    margin: 0;
  }
`;

export const Header = ({ onDrawerOpen }: Props) => {
  return (
    <StyledHeader>
      <Typography.Title level={2}>Sanakirja</Typography.Title>

      <Button type="text" icon={<MenuOutlined />} onClick={onDrawerOpen}></Button>
    </StyledHeader>
  );
};
