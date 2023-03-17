import { useCallback, useState } from "react";
import styled from "styled-components";

import { Header, Word, Drawer } from "components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 48px);
`;

export const Words = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onDrawerOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const onDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <Container>
      <Header onDrawerOpen={onDrawerOpen} />
      <Word />
      <Drawer open={drawerOpen} onClose={onDrawerClose} />
    </Container>
  );
};
