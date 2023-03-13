import { AuthProvider, UserProvider } from "contexts";

import { Routes } from "routes";

export const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <Routes />
      </UserProvider>
    </AuthProvider>
  );
};
