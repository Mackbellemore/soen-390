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
    background: '#F5F5F5',
    fontSize: '1.15em',
    borderRight: '1px solid black',
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
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

const SidebarMenu = () => {
  const { uiStore, userStore } = useContext(RootStoreContext);
  const menuItems = [];

  const handleClick = (e) => {
    appRoutes.forEach((route) => {
      route.active = false;
    });
    e.active = true;
    uiStore.closeSidebar();
  };

  appRoutes.forEach((route) => {
    if (route.name !== undefined && route.allowedRoles.includes(userStore.role)) {
      menuItems.push(
        <Flex key={route.path}>
          <ChakraLink
            as={Link}
            to={route.path}
            onClick={() => handleClick(route)}
            _focus={{}}
            my="20px"
          >
            {route.active ? route.activeIcon : route.icon}
          </ChakraLink>
        </Flex>
      );
    }
  });

  return (
    <Menu
      styles={sidebarStyles}
      pageWrapId="page-wrap"
      customBurgerIcon={false}
      customCrossIcon={false}
      isOpen={uiStore.sidebarState}
      onClose={uiStore.closeSidebar}
      display="flex"
      width="80px"
    >
      <Flex _focus={{ outline: 'none' }} direction="column">
        {menuItems}
      </Flex>
    </Menu>
  );
};

export default observer(SidebarMenu);
