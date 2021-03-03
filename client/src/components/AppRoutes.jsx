import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute.jsx';
import { appRoutes } from 'constants.js';

const routes = [];

appRoutes.forEach((route) => {
  if (route.protected) {
    routes.push(
      <ProtectedRoute
        allowedRoles={route.allowedRoles}
        component={route.component}
        key={route.path}
        path={route.path}
      />
    );
  } else {
    routes.push(<Route component={route.component} path={route.path} key={route.path} />);
  }
});

const AppRoutes = () => {
  return <Switch>{routes}</Switch>;
};

export default AppRoutes;
