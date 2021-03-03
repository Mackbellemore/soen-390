import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute.jsx';
import { appRoutes } from 'constants.js';
import { Suspense } from 'react';
import Loader from 'components/common/Loader.jsx';

const routes = [];

appRoutes.forEach((route) => {
  if (route.protected) {
    routes.push(
      <ProtectedRoute
        allowedRoles={route.allowedRoles}
        component={route.component}
        key={route.path}
        path={route.path}
        exact={route.exact}
      />
    );
  } else {
    routes.push(
      <Route exact={route.exact} component={route.component} path={route.path} key={route.path} />
    );
  }
});

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>{routes}</Switch>
    </Suspense>
  );
};

export default AppRoutes;
