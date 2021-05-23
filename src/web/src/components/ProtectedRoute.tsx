import { ComponentType } from 'react';
import { Redirect, Route } from 'react-router';
import { isAuth } from '../shared/AccessToken';
import { getUser } from '../shared/UserInformation';

interface ProtectedRouteProps {
  component: ComponentType;
  path: string;
  exact?: boolean;
  admin?: boolean;
}

export const ProtectedRoute = ({
  component,
  path,
  exact = true,
  admin = false,
}: ProtectedRouteProps) => {
  const auth = isAuth();
  const user = getUser();

  if (admin && user.userType !== 3) {
    return <Redirect to="/" />;
  }

  if (!auth) {
    return <Redirect to="/login" />;
  }

  if (auth && user.activated !== 1) {
    if (user.userType === 1 || user.userType === 0) {
      // walker
      return <Redirect to="/register/walker" />;
    }
    return <Redirect to="/register/owner" />;
  }

  return <Route component={component} path={path} exact={exact} />;
};
