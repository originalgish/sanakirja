import { useCallback } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

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
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const name = formData.get("name") as string;
      const password = formData.get("password") as string;

      login({ name, password }, () => redirectToPreviousRoute());
    },
    [redirectToPreviousRoute, login],
  );

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", width: "200px", gap: "16px" }}>
        <input type="text" name="name" id="name" />
        <input type="password" name="password" id="password" />
        <button type="submit">Log in</button>
      </form>

      <p>
        Already logged in? Go to <Link to="/">words page</Link>
      </p>
    </div>
  );
};
