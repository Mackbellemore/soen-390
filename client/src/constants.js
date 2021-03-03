import AdminPage from 'components/views/AdminPage';
import LandingPage from 'components/views/LandingPage';
import Login from 'components/views/Login';
import MainDashboard from 'components/views/MainDashboard';
import Inventory from 'components/views/Inventory.jsx';
import NoAccess from 'components/views/NoAccess.jsx';

export const rolesAvailable = ['Admin', 'General'];
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const carouselContent = [
  {
    title: 'Monitor and Manage your Inventories',
    imgName: '/assets/inventory.jpg',
  },
  {
    title: 'Track your Shipments',
    imgName: '/assets/transport.jpg',
  },
  {
    title: 'View your Orders',
    imgName: '/assets/vendor.jpg',
  },
  {
    title: "Analyze and View your Company's Finances",
    imgName: '/assets/accounting.jpg',
  },
  {
    title: 'Forecast your Sales',
    imgName: '/assets/planning.jpg',
  },
  {
    title: "Manage Customers' Purchases",
    imgName: '/assets/sales.jpg',
  },
];
export const appRoutes = [
  {
    name: 'Admin',
    protected: true,
    allowedRoles: ['Admin'],
    path: '/admin',
    component: AdminPage,
  },
  {
    name: 'Dashboard',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/main',
    component: MainDashboard,
  },
  {
    name: 'Inventory',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/inventory',
    component: Inventory,
  },
  {
    protected: false,
    path: '/login',
    component: Login,
  },
  {
    protected: false,
    path: '/no-access',
    component: NoAccess,
  },
  {
    protected: false,
    path: '/',
    component: LandingPage,
  },
];
