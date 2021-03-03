import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { RootStoreContext } from 'stores/stores.jsx';
import React, { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, component: Component, ...rest }) => {
  const { userStore } = useContext(RootStoreContext);
  const location = useLocation();

  return (
    <>
      <Route
        {...rest}
        render={(rest) => {
          return userStore.loggedIn ? (
            allowedRoles?.includes(userStore.role) ? (
              <Component />
            ) : (
              <Redirect to="/no-access" />
            )
          ) : (
            <Redirect to={{ pathname: '/login', state: { referrer: location.pathname } }} />
          );
        }}
      />
    </>
  );
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default observer(ProtectedRoute);
