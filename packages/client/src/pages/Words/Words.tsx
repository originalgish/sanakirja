import { useCallback, useState } from "react";

import { Header, Word, Drawer } from "components";
import { SettingsContextProvider } from "contexts";
import { useMode } from "hooks";

export const Words = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const modeProps = useMode();

  const onDrawerOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const onDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <SettingsContextProvider {...modeProps}>
      <div className="app">
        <Header onDrawerOpen={onDrawerOpen} />
        <Word />
        <Drawer open={drawerOpen} onClose={onDrawerClose} />
      </div>
    </SettingsContextProvider>
  );
};
