import React from 'react'
import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthContext'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import Signin from './Signin'
import PrivateRoute from './PrivateRoute'
import PrivateAuthPage from './PrivateAuthPage'


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <PrivateRoute path="/" component={Dashboard} />
        <PrivateAuthPage exact path="/signup" component={Signup} />
        <PrivateAuthPage exact path="/signin" component={Signin} />
      </div>
    </AuthProvider>
  );
}

export default App;
