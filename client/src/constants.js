import { lazy } from 'react';

export const hq = {
  longitude: -73.745181,
  latitude: 45.4644455,
};
export const mapLayerID = 'mapLayer';
export const shippingStates = [
  'Ordered',
  'Packaged',
  'Shipped',
  'Delivered',
  'Cancelled',
  'Delayed',
];
export const shippingStatesHide = ['Delivered', 'Cancelled'];
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
    component: lazy(() => import('components/views/AdminPage.jsx')),
  },
  {
    name: 'Dashboard',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/main',
    component: lazy(() => import('components/views/MainDashboard')),
  },
  {
    name: 'Inventory',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/inventory',
    component: lazy(() => import('components/views/Inventory')),
  },
  {
    name: 'Orders',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/orders',
    component: lazy(() => import('components/views/Orders')),
  },
  {
    name: 'Quality Management',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/quality-management',
    component: lazy(() => import('components/views/QualityManagement')),
  },
  {
    name: 'Shipping',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/shipping',
    component: lazy(() => import('components/views/Shipping')),
  },
  {
    protected: false,
    path: '/login',
    component: lazy(() => import('components/views/Login')),
    exact: true,
  },
  {
    protected: false,
    path: '/no-access',
    component: lazy(() => import('components/views/NoAccess')),
  },
  {
    protected: false,
    path: '/',
    component: lazy(() => import('components/views/LandingPage')),
    exact: true,
  },
  {
    protected: false,
    path: '*',
    component: lazy(() => import('components/views/NotFound')),
  },
];
