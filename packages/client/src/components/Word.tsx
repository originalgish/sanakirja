import { useCallback } from "react";
import { Button, Spin } from "antd";
import useSWR from "swr";

import { api } from "api";

import { Card } from "./Card";

import type { Word as WordType } from "types";

const getWord = () => api.get<WordType>("/words/get_random").then(({ data }) => data);

export const Word = () => {
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
  });

  const getNextWord = useCallback(async () => {
    await mutate();
  }, [mutate]);

  if (error) return <p>An error has occurred.</p>;

  if (isLoading) return <Spin size="large" />;

  return (
    <div className="word-containter">
      {word && <Card english={word.english} finnish={word.finnish} isValidating={isValidating} />}

      <Button type="primary" onClick={getNextWord} loading={isValidating} size="large">
        Next word
      </Button>
    </div>
  );
};
