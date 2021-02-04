import { Link } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import MainDashboard from '../components/MainDashboard';
import NavBar from '../components/NavBar';
import { styles } from '../components/Sidebar';
import { RootStoreContext } from '../stores/stores';

const Main = observer(() => {
  const { uiStore } = useContext(RootStoreContext);
  const router = useRouter();

  useEffect(() => {
    console.log('inside main.jsx useEffect hook');
    console.log(`userLoggedIn: ${uiStore.userLoggedIn}`);
    if (!uiStore.userLoggedIn) {
      router.push('/');
    }
  }, [router, uiStore.userLoggedIn]);

  const MenuItems = () => (
    <>
      <Link>Wassup buddy</Link>
    </>
  );

  if (!uiStore.userLoggedIn) {
    return <></>;
  }

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
