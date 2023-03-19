import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100vh;
`;

export const NotFound = () => {
  const navigate = useNavigate();

  const onNavigateHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Container>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={onNavigateHome}>
            Back Home
          </Button>
        }
      />
    </Container>
  );
};
