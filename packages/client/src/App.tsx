import { AuthProvider, ErrorProvider, UserProvider } from "contexts";

import { Routes } from "routes";

export const App = () => {
  return (
    <ErrorProvider>
      <AuthProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </AuthProvider>
    </ErrorProvider>
  );
};
