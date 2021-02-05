import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { push as Menu } from 'react-burger-menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/Login.jsx';
import Main from '../components/Main.jsx';
import NavBar from '../components/NavBar.jsx';
import { styles } from '../components/Sidebar.jsx';
import { RootStoreContext } from '../stores/stores';

const MenuItems = () => (
  <>
    <a>Link 1</a>
  </>
);

const Index = observer(() => {
  const { uiStore } = useContext(RootStoreContext);

  return (
    <>
      <BrowserRouter>
        <Menu
          styles={styles}
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
            <Route path="/main">
              <Main />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
});

export default Index;
