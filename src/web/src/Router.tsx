import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NotFoundPage } from './pages/404';
import { AdminPage } from './pages/Admin';
import { Iskalnik } from './pages/Iskalnik';
import { Login } from './pages/Login';
import { MyAds } from './pages/MyAds';
import { MyWalks } from './pages/MyWalks';
import { ProfilePage } from './pages/Profile';
import { Register } from './pages/Register';
import { OwnerRegister } from './pages/Register/Owner';
import { WalkerRegister } from './pages/Register/Walker';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" component={Iskalnik} />
        <ProtectedRoute exact path="/settings" component={ProfilePage} />
        <ProtectedRoute exact path="/ads" component={MyAds} />
        <ProtectedRoute exact path="/walks" component={MyWalks} />
        <ProtectedRoute
          exact
          path="/admin"
          admin={true}
          component={AdminPage}
        />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/walker" component={WalkerRegister} />
        <Route exact path="/register/owner" component={OwnerRegister} />
        <Route path="/login" component={Login} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};
