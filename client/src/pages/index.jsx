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
import { RootStoreContext } from '../stores/stores.jsx';

const MenuItems = () => (
  <>
    <Link to="/main">Dashboard</Link>
  </>
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
            <Route path="/login">
              <Login />
            </Route>
            <ProtectedRoute path="/main">
              <MainDashboard />
            </ProtectedRoute>
            <ProtectedRoute path="/admin" allowedRoles={['Admin']}>
              <AdminPage />
            </ProtectedRoute>
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
};

export default observer(Index);
