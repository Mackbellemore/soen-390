import { Link } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import React, { useContext } from 'react';
import { push as Menu } from 'react-burger-menu';
import { styles } from '../common/Sidebar';
import MainDashboard from '../components/MainDashboard';
import NavBar from '../components/NavBar';
import { RootStoreContext } from '../stores/stores';

const Main = observer(() => {
  const { uiStore } = useContext(RootStoreContext);

  const MenuItems = () => (
    <>
      <Link>Wassup buddy</Link>
    </>
  );

  return (
    <>
      <Head>
        <title>ERP - Main</title>
      </Head>
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
        <MainDashboard />
      </main>
    </>
  );
});

export default Main;
