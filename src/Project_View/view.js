import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './view.css';


class Module extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: props.value
        };
    }
    render() {
        return (
            <div className={this.state.class[0]}>
                {this.state.class[1]}
            </div>
        );
    }
}

class View extends Component {
    render() {
        return (
            <div className="grid">
                <Module value={["startUp", "Starting up a Project"]} />
                <Module value={["direct", "Directing a Project"]} />
                <Module value={["init", "Initiating a Project"]} />
                <Module value={["stage", "Managing a Stage Boundary"]} />
                <Module value={["control", "Controlling a Stage"]} />
                <Module value={["close", "Closing a Project"]} />
                <Module value={["manage", "Managing Project Delivery"]} />
            </div>
        );
    }
}






ReactDOM.render(<View />,  document.getElementById('root'));
export default View;
