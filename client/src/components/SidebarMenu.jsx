import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { push as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { RootStoreContext } from 'stores/stores.jsx';
import { Flex, Link as ChakraLink } from '@chakra-ui/react';
import { appRoutes } from 'constants.js';

const sidebarStyles = {
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

const SidebarMenu = () => {
  const { uiStore, userStore } = useContext(RootStoreContext);
  const menuItems = [];

  appRoutes.forEach((route) => {
    if (route.name !== undefined && route.allowedRoles.includes(userStore.role)) {
      menuItems.push(
        <Flex key={route.path}>
          <ChakraLink as={Link} to={route.path} onClick={uiStore.closeSidebar}>
            {route.name}
          </ChakraLink>
        </Flex>
      );
    }
  });

  return (
    <Menu
      styles={sidebarStyles}
      pageWrapId={'page-wrap'}
      customBurgerIcon={false}
      customCrossIcon={false}
      isOpen={uiStore.sidebarState}
      onClose={uiStore.closeSidebar}
    >
      <Flex direction="column">{menuItems}</Flex>
    </Menu>
  );
};

export default observer(SidebarMenu);
