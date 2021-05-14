import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.scss';
import { PrivateRoute } from './utils/PrivateRoute';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Error from './pages/error/Error';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <Router>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/*" component={Error} />
        </Switch>
      </Router>
    </Router>
  );
};

export default App;
