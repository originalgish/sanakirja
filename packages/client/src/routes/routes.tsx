import { Routes as RouterRoutes, Route } from "react-router-dom";

import { Login, Words } from "pages";
import { RequireAuth } from "./RequireAuth";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Words />
          </RequireAuth>
        }
      />

      <Route path="login" element={<Login />} />

      <Route path="*" element={<p>Page Not Found</p>} />
    </RouterRoutes>
  );
};
