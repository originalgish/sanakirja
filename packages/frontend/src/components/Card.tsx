import { useLayoutEffect, useState } from "react";
import { Card as AntCard, Skeleton, Typography } from "antd";
import styled from "styled-components";

import { useUser } from "contexts";

import type { Word } from "types";

type Props = {
  isValidating: boolean;
} & Word;

const StyledCard = styled(AntCard)`
  width: 300px;
  min-height: 200px;
  cursor: pointer;
`;

export const Card = ({ english, finnish, isValidating }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { user } = useUser();

  const mode = user?.preferences.mode;

  useLayoutEffect(() => {
    setIsFlipped(false);
  }, [english, finnish]);

  const frontWord = mode === "finnish" ? finnish : english;
  const backWord = mode === "finnish" ? english : finnish;

  return (
    <StyledCard onClick={() => setIsFlipped((prevFlipped) => !prevFlipped)}>
      <Skeleton loading={isValidating} active>
        <Typography.Title>{isFlipped ? backWord : frontWord}</Typography.Title>
      </Skeleton>
    </StyledCard>
  );
};
