import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Iskalnik } from './pages/Iskalnik';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { OwnerRegister } from './pages/Register/Owner';
import { WalkerRegister } from './pages/Register/Walker';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" component={Iskalnik} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/walker" component={WalkerRegister} />
        <Route exact path="/register/owner" component={OwnerRegister} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
