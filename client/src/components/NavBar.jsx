import { Box, Button, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RootStoreContext } from '../stores/stores';
import { Heading } from './common/Typography';
import { HamburgerButton } from './Sidebar';

const NavBar = observer(() => {
  const location = useLocation();
  const { uiStore } = useContext(RootStoreContext);

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
        {location.pathname === '/login' ? (
          <Link to="/">
            <Button _focus={{}} colorScheme="blue" variant="solid">
              Home
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button _focus={{}} colorScheme="blue" variant="solid">
              Log in
            </Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
});

export default NavBar;
