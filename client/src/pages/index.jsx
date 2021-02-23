import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { push as Menu } from 'react-burger-menu';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import { sidebarStyles } from '../components/Sidebar.jsx';
import Login from '../components/views/Login.jsx';
import AdminPage from '../components/views/AdminPage.jsx';
import MainDashboard from '../components/views/MainDashboard.jsx';
import NoAccess from '../components/views/NoAccess.jsx';
import { RootStoreContext } from '../stores/stores.jsx';
import { rolesAvailable } from '../constants.js';
import { Flex } from '@chakra-ui/react';

const MenuItems = () => (
  <Flex direction="column">
    <Link to="/main">Dashboard</Link>
    <Link to="/admin">Admin</Link>
  </Flex>
);

const Index = () => {
  const { uiStore } = useContext(RootStoreContext);

  return (
    <>
      <BrowserRouter>
        <Menu
          styles={sidebarStyles}
          pageWrapId={'page-wrap'}
          customBurgerIcon={false}
          customCrossIcon={false}
          isOpen={uiStore.sidebarState}
          onClose={uiStore.toggleSidebarState}
        >
          <MenuItems />
        </Menu>
        <main id="page-wrap">
          <NavBar />
          <Switch>
            <ProtectedRoute path="/admin" allowedRoles={['Admin']}>
              <AdminPage />
            </ProtectedRoute>
            <ProtectedRoute path="/main" allowedRoles={rolesAvailable}>
              <MainDashboard />
            </ProtectedRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/no-access">
              <NoAccess />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
};

export default observer(Index);
