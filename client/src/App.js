import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

// Redux
import { Provider } from "react-redux";
import store from "./store";

import Home from './components/Home/Home';
import NavbarM from './components/NavbarM/NavbarM'
import NavigatorM from './components/NavigatorM/NavigatorM'
import Location from './components/Location/Location'
import Dashboard from './components/Dashboard/Dashboard'
import FileUpload from './components/Forms/AwsTest'
import Alert from './components/Alert/Alert'
import Cart from './components/Cart/Cart'


import setAuthToken from './utils/setAuthToken';

import { loadUser } from './actions/auth'

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
        <NavbarM />
        <Alert />
        <NavigatorM />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/location' component={Location} />
            <Route exact path='/upload' component={FileUpload} />
            <Route exact path='/menu' component={Dashboard} />
            <Route exact path='/cart' component={Cart} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
  
}

export default App;
