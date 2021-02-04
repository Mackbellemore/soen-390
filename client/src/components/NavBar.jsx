import { Box, Button, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { RootStoreContext } from '../stores/stores';
import { Heading } from './common/Typography';
import { HamburgerButton } from './Sidebar';

const NavBar = observer(() => {
  const router = useRouter();
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
        {router.pathname === '/login' ? (
          <Link href="/">
            <Button _focus={{}} colorScheme="blue" variant="solid">
              Home
            </Button>
          </Link>
        ) : (
          <Link href="/login">
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
