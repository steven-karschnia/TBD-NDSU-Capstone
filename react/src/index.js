// import React from 'react';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login/login';
import Register from './Login/register';
import Landing from './Landing/landing';
import Header from './header';

import {
    Route,
    NavLink,
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import CreatePage from './Project_Create/create';
import View from './Project_View/view';

class Main extends Component {
    render() {
            var logged = localStorage.getItem('logged');
            if(logged == null) {
                localStorage.setItem('logged', false);
                logged = true;
            }

            if(logged == false) {
                return (<Redirect to="/login" />);
            }
            return(
                <div>
                    <Router>
                        <Switch>
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
                                <View project="2"/>
                            </Route>
                            <Route path="/create">
                                <CreatePage project="2"/>
                            </Route>
                            <Route path="/header">
                                <Header/>
                            </Route>
                        </Switch>
                        <Redirect to="/landing" />
                    </Router>
                </div>);
    }
}




ReactDOM.render(<Main />,  document.getElementById('root'));
