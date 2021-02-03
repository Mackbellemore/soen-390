import PropTypes from 'prop-types';
import { createContext } from 'react';
import BikesStore from './BikesStore';
import UIStore from './UIStore';

export const RootStoreContext = createContext();

const RootStore = ({ children }) => {
  return (
    <RootStoreContext.Provider value={{ uiStore: new UIStore(), bikesStore: new BikesStore() }}>
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStore;

RootStore.propTypes = {
  children: PropTypes.node.isRequired,
};
