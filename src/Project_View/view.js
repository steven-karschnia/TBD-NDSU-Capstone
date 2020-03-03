import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './view.css';


function Line(props) {
    const divStyle = {
        width: '0px',
        border: '2px solid black',
        gridColumn: props.col,
        gridRow: props.row
    }
    return (
        <div style={divStyle}>
        </div>
    );
}

class Module extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: props.value,
            display: false,
            bgColor: "white",
            css: {gridColumn: props.col,
                gridRow: props.row},
        };
    }

    handleSubmit() {
        this.setState({bgColor: "lightgreen"})
    }

    render() {
        return (
            <div className={this.state.values[0]} style={this.state.css} onClick={() => this.setState({display: !this.state.display})}>
                {this.state.values[1]}
                {this.state.display &&
                    <div className="hiddenForm">
                        <form onSubmit={() => this.handleSubmit()}>
                            <select id="complete">
                                <option>Complete</option>
                                <option>In-Progress</option>
                            </select>
                            <br />
                            <input type="submit" />
                        </form>
                    </div>}
            </div>
        );
    }
}

class View extends Component {
    render() {
        return (
            <div>
                <div className="grid">
                    <Line row="2 / 10" col="1"/>
                    <Module value={["startUp", "Starting up a Project"]} row="1 / span 2" col="2"/>
                    <Line row="2 / 10" col="3" />
                    <Module value={["direct", "Directing a Project"]} row="1" col="4 / span 8" />
                    <Module value={["init", "Initiating a Project"]} row="2" col="4 / span 2"/>
                    <Line row="2 / 10" col="6" />
                    <Module value={["stage", "Managing a Stage Boundary"]} row="2" col="7 / span 2" />
                    <Module value={["control", "Controlling a Stage"]} row="2" col="9 / span 2" />
                    <Module value={["close", "Closing a Project"]} row="2" col="11 / span 2"/>
                    <Module value={["manage", "Managing Project Delivery"]} row="3" col="9 / span 2"/>
                    <Line row="2 / 10" col="13" />
                </div>
                <div className="grid">

                </div>
            </div>
        );
    }
}






ReactDOM.render(<View />,  document.getElementById('root'));
export default View;
