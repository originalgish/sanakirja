import { Routes as RouterRoutes, Route } from "react-router-dom";

import { Login, Words, NotFound } from "pages";
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

      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};
