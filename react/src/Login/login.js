import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './login.css';
import {Redirect} from "react-router-dom";


export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            logged: null
        }
        this.state.logged = localStorage.getItem('logged');
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleUsername(e) {
        this.setState({username: e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    }

    async handleSubmit(e) {
        e.preventDefault();
        var formData = {
            username: this.state.username,
            password: this.state.password
        }
        const req = await fetch('http://127.0.0.1:8000/login',
                                {
                                    method: 'POST',
                                    headers: new Headers({
                                            'Authorization': 'Basic cm9vdDpyb290',
                                            'Content-Type': 'application/json'
                                        }),
                                    body: JSON.stringify(formData)
                                });
        const res = await req.json();
        if(res === "Logged in") {
            localStorage.setItem('logged', true);
            localStorage.setItem('username', this.state.username);
            console.log('logged in');
            this.setState({logged: true});
        } else {
            console.log('incorrect');
            this.setState({username: '', password: ''})
        }
    }

    render() {
        if(this.state.logged) {
            return <Redirect to={{
                        pathname: "/landing"
                    }} />;
        }
        return(
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="username" className="username" value={this.state.username} onChange={this.handleUsername}/>
                    <br />
                    <input type="password" placeholder="password" className="password" value={this.state.password} onChange={this.handlePassword}/>
                    <br />
                    <input type="submit" className="submit" />
                    <br />
                    <a href="/register">Don't have an account? Register here</a>
                </form>
            </div>
        );
    }
}


export default Login;
