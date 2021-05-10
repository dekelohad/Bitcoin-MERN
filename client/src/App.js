import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.scss';
import { PrivateRoute } from './utils/PrivateRoute';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Error from './pages/Error/Error';
import Dashboard from './pages/Dashboard/Dashboard';

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
