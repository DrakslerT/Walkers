import { ComponentType } from 'react';
import { Redirect, Route } from 'react-router';
import { isAuth } from '../shared/AccessToken';

interface ProtectedRouteProps {
  component: ComponentType;
  path: string;
  exact?: boolean;
}

export const ProtectedRoute = ({
  component,
  path,
  exact = true,
}: ProtectedRouteProps) => {
  const auth = isAuth();

  if (!auth) {
    return <Redirect to="/login" />;
  }

  return <Route component={component} path={path} exact={exact} />;
};
