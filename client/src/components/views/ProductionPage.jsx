import React, { lazy } from 'react';

const Productions = lazy(() => import('components/ProductionPage/Productions.jsx'));

const ProductionPage = () => {
  return <Productions />;
};
export default ProductionPage;
