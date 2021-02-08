import { Button, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { RootStoreContext } from '../stores/stores';
import { makeRequest } from '../utils/api';

const LogOutButton = () => {
  const history = useHistory();
  const { uiStore } = useContext(RootStoreContext);
  const [, setCookie] = useCookies(['userLoggedIn']);
  const toast = useToast();

  const logOutSuccess = () => {
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

  const handleLogOut = async () => {
    try {
      await makeRequest('post', 'user/logout');

      logOutSuccess();
    } catch (err) {
      if (err.response.status === 403) {
        logOutSuccess();
        return;
      }
      toast({
        position: 'top',
        title: 'An error occurred.',
        description: 'Unable to log out',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Button _focus={{}} onClick={handleLogOut}>
      Log Out
    </Button>
  );
};

export default LogOutButton;
