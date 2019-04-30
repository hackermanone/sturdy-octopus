import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginRedirect from './redirects/LoginRedirect';
import MainPage from './pages/MainPage';

import './css/grid.css';
import './css/index.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginRedirect} />
        <Route path="/login" component={LandingPage} />
        <Route path="/main" component={MainPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
