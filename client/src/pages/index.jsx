import { BrowserRouter } from 'react-router-dom';
import NavBar from 'components/NavBar.jsx';
import AppRoutes from 'components/AppRoutes.jsx';
import SidebarMenu from 'components/SidebarMenu.jsx';
import IdleMonitor from 'components/IdleMonitor.jsx';

const Index = () => {
  return (
    <>
      <BrowserRouter>
        <IdleMonitor />
        <SidebarMenu />
        <main id="page-wrap">
          <NavBar />
          <AppRoutes />
        </main>
      </BrowserRouter>
    </>
  );
};

export default Index;
