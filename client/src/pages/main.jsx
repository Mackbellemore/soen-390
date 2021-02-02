import { Link } from '@chakra-ui/react';
import Head from 'next/head';
import { push as Menu } from 'react-burger-menu';
import { styles } from '../common/Sidebar.jsx';
import MainDashboard from '../components/MainDashboard.jsx';
import NavBar from '../components/NavBar.jsx';

const Main = () => {
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
        isOpen
      >
        <MenuItems />
      </Menu>
      <main id="page-wrap">
        <NavBar />
        <MainDashboard />
      </main>
    </>
  );
};

export default Main;
