import { observer } from 'mobx-react-lite';
import { useContext, forwardRef } from 'react';
import { push as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { RootStoreContext } from 'stores/stores.jsx';
import { Flex, Link as ChakraLink, Icon, Text } from '@chakra-ui/react';
import { appRoutes } from 'constants.js';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

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
    background: 'rgba(0, 0, 0, 0.8)',
  },
};

const SidebarText = forwardRef((props, ref) => (
  <Text
    ref={ref}
    position="absolute"
    left="100"
    color="white"
    width="200px"
    textAlign="left"
    fontWeight="800"
  >
    {props.routeName}
  </Text>
));

const MotionSidebarText = motion.custom(SidebarText);

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
    const { icon: SidebarIcon } = route;
    if (route.name !== undefined && route.allowedRoles.includes(userStore.role)) {
      menuItems.push(
        <Flex key={route.path}>
          <ChakraLink
            as={Link}
            to={route.path}
            onClick={() => handleClick(route)}
            _focus={{}}
            my="15px"
          >
            <Flex
              flexDirection="row"
              alignItems="center"
              color={route.active ? 'green.500' : 'black'}
            >
              <Icon as={SidebarIcon} w={8} h={8} />

              <AnimatePresence>
                {uiStore.sidebarState && (
                  <MotionSidebarText
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1,
                    }}
                    routeName={route.name}
                  />
                )}
              </AnimatePresence>
            </Flex>
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

SidebarText.displayName = 'SidebarText';
SidebarText.propTypes = {
  routeName: PropTypes.string.isRequired,
};

export default observer(SidebarMenu);
