import { useCallback, useState } from "react";
import styled from "styled-components";

import { Header, Word, Drawer } from "components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => `calc(100vh - ${theme.variables.headerHeight})`};
  margin-top: ${({ theme }) => theme.variables.headerHeight};
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
