import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import axios from 'axios';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import events from "./Pages/events";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PublicRoute from "./Utils/PublicRoute";
import PrivateRoute from "./Utils/PrivateRoute";
import { getToken, removeUserSession, setUserSession, removeUserIDSession, setUserIDSession } from './Utils/Common';


function App(props) {

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios.get(`http://localhost:4000/auth/verifyToken?token=${token}`).then(async response => {
      setUserSession(response.data.token)
      //setUserIDSession(response.data.user);
      let config = {
        headers: {
          Authorization: "basic " + token
        }
      }
      await axios.get("http://localhost:4000/users/user-profile", config, {
      }).then(response => {
        setAuthLoading(false);
        // console.log(response.data.data.result.profile[0]);
        setUserIDSession(response.data.data.result.profile[0]);
      }).catch(error => {
        setAuthLoading(false);
        console.log("errors >>> ", error)
      })

      setAuthLoading(false);
    }).catch(error => {
      
      removeUserSession();
      removeUserIDSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
  return (

    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          
          <NavLink activeClassName="active" to="/login">Login <small> Access without token only </small></NavLink>

          <NavLink activeClassName="active" to="/register">Register<small> Access without token only </small></NavLink>

          <NavLink activeClassName="active" to="/dashboard">Dashboard <small> Access with token only </small></NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/events' component={events} />
            <PublicRoute exact path='/login' component={Login} />
            <PublicRoute exact path='/register' component={Register} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
          </Switch>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
