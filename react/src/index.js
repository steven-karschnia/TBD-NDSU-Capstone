/*TO USE CREATE PAGE: Make sure to install necessary packages to create.js
then change from <Main /> to <CreatePage /> in the ReactDom.render()
I couldn't figure out another way to make the create page functional */

// import React from 'react';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./Login/login";
import Register from "./Login/register";
import Landing from "./Landing/landing";
import Header from "./header";

import { Route, HashRouter as Router, Redirect } from "react-router-dom";

import CreatePage from "./Project_Create/create";
import View from "./Project_View/view";

function LandLog(props) {
  const logged = props.logged;
  if (logged) {
    return <Redirect to="/landing" />;
  } else {
    return <Redirect to="/login" />;
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    };
  }

  componentDidMount() {
    const logged = localStorage.getItem("logged");
    console.log(logged);
    if (logged == null || logged == false) {
      localStorage.setItem("logged", false);
      this.setState({ logged: false });
    } else {
      this.setState({ logged: true });
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
          <Route path="/view">
            <View id="" />
          </Route>
          <Route path="/create?id=:id">
            <CreatePage />
          </Route>
          <Route path="/header">
            <Header />
          </Route>
          <LandLog logged={this.state.logged} />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
