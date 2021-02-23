import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { RootStoreContext } from 'stores/stores.jsx';
import { userAuthCheck } from 'utils/api/users.js';
import { Heading } from '@chakra-ui/react';

const ProtectedRoute = ({ allowedRoles, children, ...rest }) => {
  const { userStore } = useContext(RootStoreContext);
  const [cookies, setCookie] = useCookies(['userLoggedIn']);
  const history = useHistory();

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        await userAuthCheck();
        setCookie('userLoggedIn', true, { path: '/' });
        userStore.logIn();
      } catch {
        setCookie('userLoggedIn', false, { path: '/' });
        history.push('/login');
        userStore.logOut();
      }
    };

    verifyCookie();
  }, [history, setCookie, userStore]);

  // if (!allowedRoles?.includes(userStore.role)) {
  //   return (
  //     <>
  //       <Heading size="xl" textAlign="center" mt={5}>
  //         You do not have access to this page
  //       </Heading>
  //     </>
  //   );
  // }

  return (
    <>
      {cookies.userLoggedIn === 'true' ? (
        <Route {...rest}>{children}</Route>
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )}
    </>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default observer(ProtectedRoute);
