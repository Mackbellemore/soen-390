import { lazy } from 'react';
import {
  MdDescription,
  MdAssignmentTurnedIn,
  MdAttachMoney,
  MdAddShoppingCart,
  MdLocalShipping,
  MdVerifiedUser,
  MdAccountBalance,
  MdGavel,
} from 'react-icons/md';
import Logo from './components/common/Logo.jsx';
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
export const rolesAvailable = ['Admin', 'General', 'Finance', 'Manufacturing'];
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
export const salesStatus = ['Fulfilled', 'Placed', 'Cancelled', 'Processing'];

export const appRoutes = [
  {
    name: 'Dashboard',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/main',
    component: lazy(() => import('components/views/MainDashboard')),
    icon: Logo,
    active: false,
  },
  {
    name: 'Admin',
    protected: true,
    allowedRoles: ['Admin'],
    path: '/admin',
    component: lazy(() => import('components/views/AdminPage.jsx')),
    icon: MdVerifiedUser,
  },
  {
    name: 'Inventory',
    protected: true,
    allowedRoles: ['Admin', 'General', 'Manufacturing'],
    path: '/inventory',
    component: lazy(() => import('components/views/Inventory')),
    icon: MdDescription,
  },
  {
    name: 'Orders',
    protected: true,
    allowedRoles: ['Admin', 'Finance', 'Manufacturing'],
    path: '/orders',
    component: lazy(() => import('components/views/Orders')),
    icon: MdAddShoppingCart,
    active: false,
  },
  {
    name: 'Quality Management',
    protected: true,
    allowedRoles: ['Admin', 'Manufacturing'],
    path: '/quality-management',
    component: lazy(() => import('components/views/QualityManagement')),
    icon: MdAssignmentTurnedIn,
  },
  {
    name: 'Shipping',
    protected: true,
    allowedRoles: ['Admin', 'General', 'Manufacturing'],
    path: '/shipping',
    component: lazy(() => import('components/views/Shipping')),
    icon: MdLocalShipping,
  },
  {
    name: 'Sales',
    protected: true,
    allowedRoles: ['Admin', 'Finance'],
    path: '/sales',
    component: lazy(() => import('components/views/Sales')),
    icon: MdAttachMoney,
  },
  {
    name: 'Accounting',
    protected: true,
    allowedRoles: ['Admin', 'Finance'],
    path: '/accounting',
    component: lazy(() => import('components/views/Accounting')),
    icon: MdAccountBalance,
  },
  {
    name: 'Audit Trail',
    protected: true,
    allowedRoles: ['Admin'],
    path: '/audit',
    component: lazy(() => import('components/views/AuditTrail')),
    icon: MdGavel,
  },
  {
    protected: false,
    path: '/login',
    component: lazy(() => import('components/views/Login')),
    exact: true,
  },
  {
    protected: false,
    path: '/reset/:id',
    component: lazy(() => import('components/views/ResetPasswordPage')),
  },
  {
    protected: false,
    path: '/no-access',
    component: lazy(() => import('components/views/NoAccess')),
  },
  {
    protected: false,
    path: '/bye',
    component: lazy(() => import('components/views/Inactive')),
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
