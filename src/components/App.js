import React from 'react'
import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthContext'
import Dashboard from './Dashboard'
import Signin from './Signin'
import PrivateRoute from './PrivateRoute'
import PrivateAuthPage from './PrivateAuthPage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)


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
