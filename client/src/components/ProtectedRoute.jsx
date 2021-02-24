import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { RootStoreContext } from 'stores/stores.jsx';
import { userAuthCheck } from 'utils/api/users.js';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ allowedRoles, children, ...rest }) => {
  const { userStore } = useContext(RootStoreContext);
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['hasLoggedOut']);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const res = await userAuthCheck();
        const { username, email, role } = res.data;
        userStore.setUsername(username);
        userStore.setEmail(email);
        userStore.setRole(role);
        userStore.logIn();
        removeCookie('hasLoggedOut', { path: '/' });
      } catch {
        history.push('/login');
        userStore.logOut();
        setCookie('hasLoggedOut', true, { path: '/' });
      }
    };

    if (cookies.hasLoggedOut === undefined) {
      verifyCookie();
    }
  }, [cookies.hasLoggedOut, history, removeCookie, setCookie, userStore]);

  return (
    <>
      {userStore.loggedIn ? (
        allowedRoles?.includes(userStore.role) ? (
          <Route {...rest}>{children}</Route>
        ) : (
          <Redirect to={{ pathname: '/no-access' }} />
        )
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
