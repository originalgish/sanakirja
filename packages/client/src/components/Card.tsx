import { useLayoutEffect, useState } from "react";
import { Card as AntCard, Skeleton, Typography } from "antd";
import { useSettingsContext } from "contexts";

import type { Word } from "types";

type Props = {
  isValidating: boolean;
} & Word;

export const Card = ({ english, finnish, isValidating }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const { mode } = useSettingsContext();

  useLayoutEffect(() => {
    setIsFlipped(false);
  }, [english, finnish]);

  const frontWord = mode === "finnish" ? finnish : english;
  const backWord = mode === "finnish" ? english : finnish;

  return (
    <AntCard className="card" onClick={() => setIsFlipped((prevFlipped) => !prevFlipped)}>
      <Skeleton loading={isValidating} active>
        <Typography.Title>{isFlipped ? backWord : frontWord}</Typography.Title>
      </Skeleton>
    </AntCard>
  );
};
