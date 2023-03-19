import { lazy, Suspense } from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";

import { Spinner } from "components";
import { RequireAuth } from "./RequireAuth";

const Login = lazy(() => import("pages/Login"));
const Words = lazy(() => import("pages/Words"));
const NotFound = lazy(() => import("pages/NotFound"));

export const Routes = () => {
  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
  );
};
