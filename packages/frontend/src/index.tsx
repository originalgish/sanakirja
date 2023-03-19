import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { App } from "./App";
import { ErrorBoundary } from "components";

import { GlobalStyle, theme } from "styles";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </BrowserRouter>,
);
