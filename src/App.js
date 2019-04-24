import React, { Component } from 'react';
import './App.scss';
import { Route, Switch, withRouter } from "react-router-dom";
import { protectedRoute, nonPrivateRoute } from './routes'
import AuthRoute from './routes/AuthRoute';

class App extends Component {

  isToken = () => {
    const token = localStorage.getItem('sessionTocken');
    // const token = localStorage.getItem('isLogged');
    console.log('--------- ');
    console.log(!!token);
    return !!token ? true : false;
  }
  render() {
    const isAuthed = this.isToken();
    return (
      <div className="App">
        <Switch>
          {
            protectedRoute.map((prop, key) => {
              return (
                <AuthRoute exact authed={isAuthed} path={prop.path} key={key} component={prop.component} />
              );
            })
          }
          {
            nonPrivateRoute.map((prop, key) => {
              return (
                <Route exact path={prop.path} key={key} component={prop.component} />
              );
            })
          }
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
