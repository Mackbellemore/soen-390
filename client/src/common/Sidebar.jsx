import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import { RootStoreContext } from '../stores/stores.js';

export const styles = {
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

export const HamburgerButton = observer(() => {
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
});
