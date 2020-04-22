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
        }
    }

    render() {
        return(
            <div className="header">
                <h1 className="projectName">{this.state.projectName}</h1>
                <div className="user">
                    <img src={genericUser}/>
                        <p>{this.state.user}</p>
                        <a href="/login">Logout</a>
                </div>
            </div>
        );
    }
}

export default Header;
