import { useCallback, useState } from "react";

import { Header, Word, Drawer } from "components";

export const Words = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onDrawerOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const onDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <div className="app">
      <Header onDrawerOpen={onDrawerOpen} />
      <Word />
      <Drawer open={drawerOpen} onClose={onDrawerClose} />
    </div>
  );
};
