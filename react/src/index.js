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
    constructor(props) {
        super(props);
        this.state = {
            logged: false
        }
    }

    componentDidMount() {
        var logged = localStorage.getItem('logged');
        if(logged == null || logged == false) {
            localStorage.setItem('logged', false);
            logged = false;
        }
        this.setState({logged});
    }

    render() {
        if(this.state.logged) {
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
                </div>
            );
        } else {
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
                        <Redirect to="/login" />
                    </Router>
                </div>
            );
        }
    }
}




ReactDOM.render(<Main />,  document.getElementById('root'));
