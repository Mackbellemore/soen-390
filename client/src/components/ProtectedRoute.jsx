import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { RootStoreContext } from '../stores/stores';
import { makeRequest } from '../utils/api';

const ProtectedRoute = observer(({ children, ...rest }) => {
  const { uiStore } = useContext(RootStoreContext);
  const [cookies, setCookie] = useCookies(['userLoggedIn']);
  const history = useHistory();

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        await makeRequest('get', 'user/authCheck');
        setCookie('userLoggedIn', true, { path: '/' });
        uiStore.userLogIn();
      } catch {
        setCookie('userLoggedIn', false, { path: '/' });
        history.push('/login');
        uiStore.userLogOut();
      }
    };

    verifyCookie();
  }, [history, setCookie, uiStore]);

  return (
    <>
      {cookies.userLoggedIn === 'true' ? (
        <Route {...rest}>{children}</Route>
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )}
    </>
  );
});

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
