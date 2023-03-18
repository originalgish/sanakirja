import { useCallback } from "react";
import { Button, Spin } from "antd";
import styled from "styled-components";
import useSWR from "swr";

import { api } from "api";
import { useError } from "contexts";

import { Card } from "./Card";

import type { Word as WordType } from "types";

const getWord = () => api.get<WordType>("/words/get_random").then(({ data }) => data);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Word = () => {
  const { setError } = useError();
  const {
    data: word,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<WordType>("word", getWord, {
    revalidateOnMount: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onError: (error) => setError(error),
  });

  const getNextWord = useCallback(async () => {
    try {
      await mutate();
    } catch (error) {
      setError(error);
    }
  }, [mutate, setError]);

  if (error) return <p>An error has occurred.</p>;

  if (isLoading) return <Spin size="large" />;

  return (
    <Container>
      {word && <Card english={word.english} finnish={word.finnish} isValidating={isValidating} />}

      <Button type="primary" onClick={getNextWord} loading={isValidating} size="large">
        Next word
      </Button>
    </Container>
  );
};
