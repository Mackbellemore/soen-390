import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { push as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { RootStoreContext } from 'stores/stores.jsx';
import { Flex, Link as ChakraLink } from '@chakra-ui/react';
import { appRoutes } from 'constants.js';
import Logo from '../components/common/Logo';

const sidebarStyles = {
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#F5F5F5',
    fontSize: '1.15em',
    width: '80px',
    border: '2px solid black',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    paddingTop: '20px',
  },
  bmItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '60px',
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
      if (route.name === 'Inventory') {
        menuItems.push(
          <Flex key={route.path}>
            <ChakraLink as={Link} to={route.path} onClick={uiStore.closeSidebar} _focus={{}}>
              Inventory
            </ChakraLink>
          </Flex>
        );
      } else {
        menuItems.push(
          <Flex key={route.path}>
            <ChakraLink as={Link} to={route.path} onClick={uiStore.closeSidebar} _focus={{}}>
              {route.name}
            </ChakraLink>
          </Flex>
        );
      }
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
      display="flex"
    >
      <Logo />
      <Flex direction="column">{menuItems}</Flex>
    </Menu>
  );
};

export default observer(SidebarMenu);
