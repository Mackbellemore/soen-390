import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RootStoreContext } from '../stores/stores';

const ProtectedRoute = ({ children, ...rest }) => {
  const { uiStore } = useContext(RootStoreContext);

  return (
    <>
      {uiStore.userLoggedIn ? (
        <Route {...rest}>{children}</Route>
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )}
    </>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
