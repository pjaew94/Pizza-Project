import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import Home from "./components/Home/Home";
import NavbarM from "./components/NavbarM/NavbarM";
import NavigatorM from "./components/NavigatorM/NavigatorM";
import Location from "./components/Location/Location";
import Dashboard from "./components/Dashboard/Dashboard";
import Alert from "./components/Alert/Alert";
import Cart from "./components/Cart/Cart";



const App = () => {


  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="the-container">
            <div className="the-inner-container">
              <NavbarM />
              <Alert />
              <NavigatorM />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/location" component={Location} />
                <Route exact path="/menu" component={Dashboard} />
                <Route exact path="/cart" component={Cart} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
