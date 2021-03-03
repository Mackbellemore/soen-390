import { lazy } from 'react';

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
