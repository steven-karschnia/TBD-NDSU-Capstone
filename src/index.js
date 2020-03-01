// import React from 'react';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';

import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import CreatePage from './Project_Create/create';
import ViewPage from './Project_View/view';


import App from './App';
import genericUser from './user.png'
import * as serviceWorker from './serviceWorker';

class Main extends Component {
    render() {
            return(
            <div id="container">
            <HashRouter>
                    <div className="header">
                        <h1 className="projectName">Test Project</h1>
                        <div className="user">
                            <img src={genericUser}/>
                                <p>User</p>
                        </div>
                    </div>

                    <div className="Body">
                        <div className="navLinks">
                            <ul>
                                <li> <NavLink to="/view">view</NavLink> </li>
                                <li> <NavLink to="/create">create</NavLink> </li>
                                <li> <NavLink to="/App">App</NavLink> </li>
                            </ul>
                        </div>
                        <div id="content">
                            <Route path="/view" component={ViewPage}/>
                            <Route path="/create" component={CreatePage}/>
                            <Route path="/App" component={App}/>
                        </div>

                    </div>
                </HashRouter>
            </div>
        );
    }
}


ReactDOM.render(<Main />,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
