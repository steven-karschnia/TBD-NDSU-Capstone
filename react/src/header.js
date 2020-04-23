import React, { Component } from "react";
import './index.js';
import {Redirect} from "react-router-dom";

import genericUser from './user.png'

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: props.projectName,
            user: props.user,
            logged: true
        };
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.setState({logged: false});
        localStorage.setItem('logged', false);
        localStorage.removeItem('username');
    }

    render() {
        if(!this.state.logged) {
            return(<Redirect to={{pathname: "/login"}} />);
        }
        return(
            <div className="header">
                <h1 className="projectName">{this.state.projectName}</h1>
                <div className="user">
                    <img src={genericUser}/>
                        <p>
                            {this.state.user}
                            <br />
                            <button onClick={this.logout}>Logout</button>
                        </p>
                </div>
            </div>
        );
    }
}

export default Header;
