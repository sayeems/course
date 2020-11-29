import React from 'react'
import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import Signin from './Signin'
import PrivateRoute from './PrivateRoute'
import PrivateAuthPage from './PrivateAuthPage'


function App() {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <div className="App">
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateAuthPage path="/signup" component={Signup} />
            <PrivateAuthPage path="/signin" component={Signin} />
          </div>
        </AuthProvider>
      </Switch>
    </Router>
  );
}

export default App;
