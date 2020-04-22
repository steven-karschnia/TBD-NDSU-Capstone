// import React from 'react';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './landing.css';
import {Redirect} from "react-router-dom";

import Header from '../header';

import * as serviceWorker from '../serviceWorker';

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            load: false,
            index: -1
        }
    }

    async componentDidMount() {
        const res = await fetch('http://127.0.0.1:8000/projects/',
                          {
                              method: 'GET',
                              headers: new Headers({'Authorization': 'Basic cm9vdDpyb290'})
                          });
        const projects = await res.json();
        console.log(projects.results);
        this.setState({projects: projects.results})
    }

    loadProject(item) {
        var index = this.state.projects.indexOf(item);
        this.setState({load: true})
        this.setState({index})
    }

    render() {
        const items = [];
        for(const item of this.state.projects) {
            items.push(
                <tr>
                    <td onClick={() => this.loadProject(item)}>{item.name}</td>
                    <td>{item.company}</td>
                </tr>
            );
        }
        if(this.state.load) {
            return <Redirect to={{
                        pathname: "/view"
                    }} />
        }
        return(
            <table>
                <tr>
                    <th>Project Name</th>
                    <th>Company Name</th>
                </tr>
                {items}
            </table>
        );
    }
}

export class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };
        this.state.username = localStorage.getItem('username');
    }

    render() {
            return(
            <div id="container">
                <Header projectName="" user={this.state.username}/>

                <div className="Body">
                    <div className="navLinks">
                        <ul>
                            <li> <a href="/view">view</a> </li>
                            <li> <a href="/create">create</a> </li>
                        </ul>
                    </div>
                </div>

                <ProjectList />
            </div>
        );
    }
}

export default Landing;
ReactDOM.render(<Landing />,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
