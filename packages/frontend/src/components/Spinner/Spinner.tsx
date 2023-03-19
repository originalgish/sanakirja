import { Spin } from "antd";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100vh;
`;

export const Spinner = () => {
  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
};
