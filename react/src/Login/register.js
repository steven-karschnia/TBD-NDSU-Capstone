import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './login.css';
import {Redirect} from "react-router-dom";

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            first: '',
            last: '',
            email: '',
            secPassword: '',
            logged: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast= this.handleLast.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSecPassword = this.handleSecPassword.bind(this);
    }

    handleUsername(e) {
        this.setState({username: e.target.value});
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    }

    handleSecPassword(e) {
        this.setState({secPassword: e.target.value});
    }

    handleFirst(e) {
        this.setState({first: e.target.value});
    }

    handleLast(e) {
        this.setState({last: e.target.value});
    }

    handleEmail(e) {
        this.setState({email: e.target.value});
    }

    async handleSubmit(e) {
        e.preventDefault();
        if(!(this.state.password === this.state.secPassword)) {

        } else {
            var formData = {
                username: this.state.username,
                password: this.state.password,
                first_name: this.state.first,
                last_name: this.state.last,
                email: this.state.email,
            }
            const req = await fetch('http://127.0.0.1:8000/register',
                                    {
                                        method: 'POST',
                                        headers: new Headers({
                                                'Authorization': 'Basic cm9vdDpyb290',
                                                'Content-Type': 'application/json'
                                            }),
                                        body: JSON.stringify(formData)
                                    });
            const res = await req.json();

        }
    }

    render() {
        return(
            <div className="register">
                <form onSubmit={this.handleSubmit} className="regForm">
                    <input type="text" placeholder="first name" value={this.state.first} onChange={this.handleFirst}/>
                    <br />
                    <input type="text" placeholder="last name" value={this.state.last} onChange={this.handleLast}/>
                    <br />
                    <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsername}/>
                    <br />
                    <input type="text" placeholder="email" value={this.state.email} onChange={this.handleEmail}/>
                    <br />
                    <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePassword}/>
                    <br />
                    <input type="password" placeholder="repeat password" value={this.state.secPassword} onChange={this.handleSecPassword}/>
                    <br />
                    <input type="submit" className="submit" />
                    <br />
                    <a href="/#/login">Already have an account? Login</a>
                </form>
            </div>
        );
    }
}

export default Register;
