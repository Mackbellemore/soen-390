import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import UIStore from './UIStore.js';
import UserStore from './UserStore.js';
export const RootStoreContext = createContext(null);

const RootStore = ({ children }) => {
  return (
    <RootStoreContext.Provider
      value={{
        uiStore: new UIStore(),
        userStore: new UserStore(),
      }}
    >
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStore;

RootStore.propTypes = {
  children: PropTypes.node.isRequired,
};
