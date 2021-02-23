import { Button, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RootStoreContext } from 'stores/stores.jsx';

const LogOutButton = () => {
  const history = useHistory();
  const { userStore } = useContext(RootStoreContext);
  const toast = useToast();

  const logOutSuccess = () => {
    userStore.logOut();
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

  const handleLogOut = async () => {
    navigator.serviceWorker.controller.postMessage({
      type: 'REVOKE_TOKEN',
    });
    logOutSuccess();
  };

  return (
    <Button _focus={{}} onClick={handleLogOut}>
      Log Out
    </Button>
  );
};

export default LogOutButton;
