import React, { useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import type { FormProps } from "antd";
import styled from "styled-components";

import { useAuth } from "contexts";

type LocationState = {
  from: {
    pathname: string;
  };
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: grid;
  justify-items: center;
  align-content: center;
`;

const StyledForm: React.FC<FormProps> = styled(Form)`
  display: grid;
  max-width: 600;
  width: 80%;
`;

const StyledTitle = styled(Typography.Title)`
  margin-top: 0;
  text-align: center;
`;

const StyledSubmitItem = styled(Form.Item)`
  justify-self: center;
`;

const StyledLoggedInText = styled(Typography.Text)`
  justify-self: center;
`;

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const redirectToPreviousRoute = useCallback(() => {
    const state = location.state as LocationState;
    const previousPath = state?.from?.pathname || "/";

    navigate(previousPath, { replace: true });
  }, [location.state, navigate]);

  const onSubmit = useCallback(
    ({ name, password }: { name: string; password: string }) => {
      login({ name, password }, () => redirectToPreviousRoute());
    },
    [redirectToPreviousRoute, login],
  );

  return (
    <Container>
      <StyledForm name="login" layout="vertical" onFinish={onSubmit}>
        <StyledTitle>Login</StyledTitle>

        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }]}>
          <Input.Password />
        </Form.Item>

        <StyledSubmitItem>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </StyledSubmitItem>

        <StyledLoggedInText>
          Already logged in? <Link to="/">Take a seat</Link> then.
        </StyledLoggedInText>
      </StyledForm>
    </Container>
  );
};
