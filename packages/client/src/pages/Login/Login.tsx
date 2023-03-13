import { useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";

import { useAuth } from "contexts";

type LocationState = {
  from: {
    pathname: string;
  };
};

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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100%",
        display: "grid",
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      <Form name="login" layout="vertical" style={{ display: "grid", maxWidth: 600, width: "80%" }} onFinish={onSubmit}>
        <Typography.Title style={{ marginTop: 0, textAlign: "center" }}>Login</Typography.Title>

        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ justifySelf: "center" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Typography.Text style={{ justifySelf: "center" }}>
          Already logged in? <Link to="/">Take a seat</Link> then.
        </Typography.Text>
      </Form>
    </div>
  );
};
