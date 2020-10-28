import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

// Redux
import { Provider } from "react-redux";
import store from "./store";

import Home from './components/Home/Home';
import FileUpload from './components/Forms/AwsTest'
import DeliveryPickUp from './components/DeliveryPickUp/DeliveryPickUp'


import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/upload' component={FileUpload} />
            <Route exact path='/delivery' component={DeliveryPickUp} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
  
}

export default App;
