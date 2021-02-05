import { Box, Button as ChakraButton, Flex, useToast } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { RootStoreContext } from '../stores/stores';
import { Heading } from './common/Typography';
import { HamburgerButton } from './Sidebar';

const Button = ({ path, text }) => (
  <Link to={path}>
    <ChakraButton _focus={{}} colorScheme="blue" variant="solid">
      {text}
    </ChakraButton>
  </Link>
);

const NavBar = observer(() => {
  const location = useLocation();
  const history = useHistory();
  const { uiStore } = useContext(RootStoreContext);
  const [, setCookie] = useCookies(['userLoggedIn']);
  const toast = useToast();

  const onLogin = location.pathname === '/login';
  const onHome = location.pathname === '/';
  const onOther = !(onLogin || onHome);

  const handleLogOut = () => {
    uiStore.userLogOut();
    setCookie('userLoggedIn', false, { path: '/' });
    history.push('/');
    toast({
      position: 'top',
      title: 'Logged out',
      description: 'You have logged out successfully',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      bg="#fdfdfd"
      boxShadow="lg"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      paddingX="3rem"
      paddingY="2rem"
    >
      <Flex alignItems="center">{uiStore.userLoggedIn ? <HamburgerButton /> : <></>}</Flex>
      <Heading>Enterprise Resource Planning</Heading>
      <Flex>
        {onLogin && <Button path="/" text="Home" />}
        {onHome && <Button path="/login" text="Log In" />}
        {onOther && (
          <ChakraButton _focus={{}} onClick={handleLogOut}>
            Log Out
          </ChakraButton>
        )}
      </Flex>
    </Box>
  );
});

Button.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
};

export default NavBar;
