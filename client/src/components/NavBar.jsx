import { Box, Button as ChakraButton, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RootStoreContext } from 'stores/stores.jsx';
import { Heading } from './common/Typography.jsx';
import LogOutButton from './LogOutButton.jsx';
import SidebarButton from 'components/SidebarButton.jsx';
import { appRoutes } from 'constants.js';

const Button = ({ path, text }) => (
  <Link to={path}>
    <ChakraButton
      _focus={{}}
      colorScheme="blue"
      variant="solid"
      marginRight={{ base: '10px', sm: '36px' }}
    >
      {text}
    </ChakraButton>
  </Link>
);

const allPaths = [];

appRoutes.forEach((route) => {
  allPaths.push(route.path);
});

const NavBar = () => {
  const location = useLocation();
  const { userStore } = useContext(RootStoreContext);

  const shouldRenderHomeButton =
    location.pathname === '/login' ||
    !allPaths.includes(location.pathname) ||
    location.pathname === '/no-access';
  const shouldRenderLoginButton = location.pathname === '/';
  const onOther = !(shouldRenderHomeButton || shouldRenderLoginButton);

  return (
    <Box
      bg="#fdfdfd"
      boxShadow="lg"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      paddingX={{ md: '3rem' }}
      paddingY="2rem"
    >
      <Flex alignItems="center">{userStore.loggedIn ? <SidebarButton /> : null}</Flex>
      <Heading fontSize={{ base: '14px', sm: '36px' }} lineHeight={{ base: '40px', sm: '1.5' }}>
        Enterprise Resource Planning
      </Heading>
      <Flex>
        {shouldRenderHomeButton && <Button path="/" text="Home" />}
        {shouldRenderLoginButton && <Button path="/login" text="Log In" />}
        {onOther && <LogOutButton />}
      </Flex>
    </Box>
  );
};

Button.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
};

export default observer(NavBar);
