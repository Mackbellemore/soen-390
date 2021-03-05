import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import { RootStoreContext } from 'stores/stores.jsx';

const SidebarButton = () => {
  const { uiStore } = useContext(RootStoreContext);

  return (
    <HamburgerMenu
      isOpen={uiStore.sidebarState}
      menuClicked={uiStore.toggleSidebarState}
      width={36}
      height={30}
      strokeWidth={4}
      rotate={0}
      color="black"
      borderRadius={5}
      animationDuration={0.3}
    />
  );
};

export default observer(SidebarButton);
