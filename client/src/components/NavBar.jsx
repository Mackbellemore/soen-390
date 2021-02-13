import { Box, Button as ChakraButton, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RootStoreContext } from '../stores/stores';
import { Heading } from './common/Typography';
import LogOutButton from './LogOutButton';
import { HamburgerButton } from './Sidebar';

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

const NavBar = observer(() => {
  const location = useLocation();
  const { uiStore } = useContext(RootStoreContext);

  const onLogin = location.pathname === '/login';
  const onHome = location.pathname === '/';
  const onOther = !(onLogin || onHome);

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
      <Flex alignItems="center">{uiStore.userLoggedIn ? <HamburgerButton /> : <></>}</Flex>
      <Heading fontSize={{ base: '14px', sm: '36px' }} lineHeight={{ base: '40px', sm: '1.5' }}>
        Enterprise Resource Planning
      </Heading>
      <Flex>
        {onLogin && <Button path="/" text="Home" />}
        {onHome && <Button path="/login" text="Log In" />}
        {onOther && <LogOutButton />}
      </Flex>
    </Box>
  );
});

Button.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
};

export default NavBar;
