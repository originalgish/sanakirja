import { AuthProvider } from "contexts";

import { Routes } from "routes";

export const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
