import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { message } from "antd";
import { AxiosError } from "axios";

type ErrorType = {
  status?: number;
  message: string;
};

type ErrorContextType = {
  error: ErrorType | null;
  setError: (error: unknown) => void;
};

const ErrorContext = createContext({} as ErrorContextType);

const getFormattedMessage = ({ status, message }: ErrorType) => (
  <span>
    {status && <b>{status}: </b>}
    {message}
  </span>
);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setStateError] = useState<ErrorType | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const setError = useCallback((error: unknown) => {
    if (error instanceof AxiosError) {
      setStateError({
        status: error.response?.status,
        message: error.response?.data,
      });
    }
  }, []);

  useEffect(() => {
    if (error) {
      messageApi.error(getFormattedMessage(error), 5, () => setStateError(null));
    }
  }, [error, messageApi]);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {
        <>
          {contextHolder}
          {children}
        </>
      }
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
