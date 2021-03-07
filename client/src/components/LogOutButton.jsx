import { Button, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RootStoreContext } from 'stores/stores.jsx';
import { useCookies } from 'react-cookie';

const LogOutButton = () => {
  const history = useHistory();
  const { userStore } = useContext(RootStoreContext);
  const toast = useToast();
  const [, setCookie] = useCookies(['hasLoggedOut']);

  const handleLogOut = async () => {
    localStorage.setItem('jwt', '');
    userStore.logOut();
    setCookie('hasLoggedOut', true, { path: '/' });

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
    <Button _focus={{}} onClick={handleLogOut}>
      Log Out
    </Button>
  );
};

export default LogOutButton;
