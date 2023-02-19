import { Card as AntCard, Skeleton, Typography } from "antd";
import { useLayoutEffect, useState } from "react";

type Props = {
  english: string;
  finnish: string;
  isValidating: boolean;
};

export const Card = ({ english, finnish, isValidating }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useLayoutEffect(() => {
    setIsFlipped(false);
  }, [english, finnish]);

  return (
    <AntCard className="card" onClick={() => setIsFlipped((prevFlipped) => !prevFlipped)}>
      <Skeleton loading={isValidating} active>
        <Typography.Title>{isFlipped ? english : finnish}</Typography.Title>
      </Skeleton>
    </AntCard>
  );
};
