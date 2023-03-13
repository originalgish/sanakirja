import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "contexts";
import { Button } from "antd";

export const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout(() => navigate("/"));
  }, [logout, navigate]);

  return (
    <Button type="default" onClick={handleLogout}>
      Logout
    </Button>
  );
};
