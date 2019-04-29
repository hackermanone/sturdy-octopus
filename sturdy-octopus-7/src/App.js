import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginRedirect from './redirects/LoginRedirect';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginRedirect} />
        <Route path="/login" component={LandingPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
