import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import HamburgerMenu from 'react-hamburger-menu';

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClick = () => {
    setSidebarOpen(!sidebarOpen);
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
      <Flex alignItems="center">
        <HamburgerMenu
          isOpen={sidebarOpen}
          menuClicked={handleClick}
          width={36}
          height={30}
          strokeWidth={4}
          rotate={0}
          color="black"
          borderRadius={5}
          animationDuration={0.3}
        />
      </Flex>
      <Heading>Enterprise Resource Planning</Heading>
      <Flex>
        <Link href="/login">
          <Button _focus={{}} colorScheme="teal" variant="solid">
            Log in
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default NavBar;
