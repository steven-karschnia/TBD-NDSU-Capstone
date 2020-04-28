import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './view.css';

import Header from '../header';

function Arrow(props) {
    const style = {
        stroke: "black",
        strokeWidth: 3,
        gridColumn: props.col,
        gridRow: props.row,
        marginLeft: props.left,
        marginTop: props.top,
        zIndex: 5,
    };
    return (
        <svg width="700" height="50" style={style}>
            <defs>
                <marker id="arrow" viewBox="0 0 40 40" refX="0" refY="20"
                    markerWidth="6" markerHeight="6"
                    orient="auto-start-reverse">
                    <path d="M 0 0 L 40 20 L 0 40 Z" strokeWidth="1" />
                </marker>
            </defs>
            <line x1={props.x1} x2={props.x2} y1={props.y1} y2={props.y2} markerEnd="url(#arrow)"/>
            <line x1={props.x1} x2={props.x2} y1={props.y1} y2={props.y2} strokeWidth={props.strokeWidth}/>
            <text x={(props.x1+props.x2)/2} y="15" textAnchor="middle"
                style={{fill: "white", stroke: "white", lineHeight: "1", strokeWidth: "1", fontSize: "small"}}>
                {props.text}
            </text>
        </svg>
    );
}

function Line(props) {
    const divStyle = {
        width: '0px',
        border: props.border,
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
        var background = "linear-gradient(90deg, lightgreen " + props.progress + "%, white " + props.progress + "%)";
        this.state = {
            values: props.value,
            display: false,
            css: {gridColumn: props.col,
                  gridRow: props.row,
                  height: "100%",},
            background: background,
            height: props.height,
            selectValue: props.progress,

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({selectValue: event.target.value});
    }

    handleSubmit(event) {
        var background = "linear-gradient(90deg, lightgreen " + this.state.selectValue + "%, white " + this.state.selectValue + "%)";
        this.setState({background});
        this.setState({display: false});

    }

    render() {
        return (
          <div style={this.state.css}>
            <div className={this.state.values[0]} style={{background: this.state.background, height: this.state.height}} onClick={() => this.setState({display: !this.state.display})}>
                {this.state.values[1]}
            </div>
            {this.state.display &&
                <div className="hiddenForm">
                    <form onSubmit={this.handleSubmit}>
                        <input className="slider" value={this.state.selectValue} onChange={this.handleChange} id="complete" type="range" min="1" max="100" />
                        <label for="complete">{this.state.selectValue}%</label>
                        <br />
                        <input type="submit" />
                    </form>
                </div>}
          </div>
        );
    }
}

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: [],
            received: false,
            id: props.id
        };
    }



    async componentDidMount() {
        try {
          const res = await fetch('http://127.0.0.1:8000/projects/' + this.state.id,
                            {
                                method: 'GET',
                                headers: new Headers({'Authorization': 'Basic cm9vdDpyb290'})
                            });
          const projects = await res.json();
          const layout = JSON.parse(projects.results[0].data).elements;
          this.setState({
            layout
          });
          this.setState({received: true});
        } catch (e) {
          console.log(e);
        }
    }

    render() {
        const items = [];
        for(const item of this.state.layout) {
            items.push(
                <Module value={["largeModule",item.type]} row={item.x + " / span " + item.w} col={item.y + " / span " + item.h} height={(item.w * 40) + "px"} progress={item.progress}/>
            );
        }
        return(
            <div className="grid">{items}</div>
        );
    }
}

class View extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            username: '',
            id: props.id,
        };
        this.state.username = localStorage.getItem('username');
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <Header projectName="" user={this.state.username} />
                <Layout id={this.state.id}/>
            </div>
        );

        // return (
        //     <div>
        //         <div className="grid">
        //             <Line row="4 / 11" col="1" border="1px solid grey" />
        //             <Line row="4 / 11" col="3" border="1px solid grey" />
        //             <Line row="4 / 11" col="6" border="1px solid grey" />
        //             <Line row="4 / 11" col="15" border="1px solid grey" />
        //             <Line row="9 / 11" col="9" border="1px dashed grey" />
        //             <Line row="9 / 11" col="12" border="1px dashed grey" />
        //
        //             <Arrow row="1" col="2" x1="10" x2="10" y1="0" y2="15" top="-7" left="40" strokeWidth="10"/>
        //             <Arrow row="2" col="3" x1="0" x2="15" y1="10" y2="10" top="40" left="-10" strokeWidth="10"/>
        //             <Arrow row="3" col="4" x1="10" x2="10" y1="0" y2="15" top="-7" left="20" strokeWidth="10"/>
        //             <Arrow row="3" col="5" x1="10" x2="10" y1="35" y2="20" top="-21" left="50" strokeWidth="10"/>
        //             <Arrow row="4" col="6" x1="0" x2="15" y1="10" y2="10" top="40" left="-10" strokeWidth="10"/>
        //             <Arrow row="3" col="8" x1="10" x2="10" y1="35" y2="20" top="-21" left="50" strokeWidth="10"/>
        //             <Arrow row="3" col="10" x1="10" x2="10" y1="0" y2="15" top="-7" left="20" strokeWidth="10"/>
        //             <Arrow row="4" col="9" x1="35" x2="20" y1="10" y2="10" top="40" left="-21" strokeWidth="10"/>
        //             <Arrow row="4" col="12" x1="0" x2="15" y1="10" y2="10" top="40" left="-10" strokeWidth="10"/>
        //             <Arrow row="5" col="10" x1="10" x2="10" y1="0" y2="15" top="-7" left="20" strokeWidth="10"/>
        //             <Arrow row="5" col="11" x1="10" x2="10" y1="35" y2="20" top="-21" left="50" strokeWidth="10"/>
        //             <Arrow row="3" col="13" x1="10" x2="10" y1="35" y2="20" top="-21" left="20" strokeWidth="10"/>
        //             <Arrow row="6" col="8" x1="10" x2="10" y1="35" y2="20" top="20" left="60" strokeWidth="10"/>
        //
        //             <Module value={["largeModule", "Starting up a Project"]} row="2 / 5" col="2" height="140px"/>
        //             <Module value={["largeModule", "Directing a Project"]} row="2" col="4 / 14" height="40px"/>
        //             <Module value={["largeModule", "Initiating a Project"]} row="4" col="4 / 6" height="40px"/>
        //             <Module value={["largeModule", "Managing a Stage Boundary"]} row="4" col="7 / 9" height="40px"/>
        //             <Module value={["largeModule", "Controlling a Stage"]} row="4" col="10 / 12" height="40px"/>
        //             <Module value={["largeModule", "Closing a Project"]} row="4" col="13 / 15" height="40px"/>
        //             <Module value={["largeModule", "Managing Project Delivery"]} row="6" col="10 / 12" height="40px"/>
        //
        //             <Arrow row="9" col="7 / 12" x1="0" x2="615" y1="10" y2="10" text="Project Timebox" strokeWidth="15"/>
        //
        //             <hr style={{gridRow: "8", gridColumn: "2 / 15", border: "2px solid lightgrey", width: "100%"}}/>
        //
        //             <div style={{gridArea: "9 / 4 / 11 / 6"}}>
        //                 <div className="agileGrid">
        //                     <Module value={["smallModule", "IP"]} row="3" col="1 / 6" height="25px"/>
        //                     <Module value={["smallModule", "SB"]} row="3" col="6 / 8" height="25px" />
        //                 </div>
        //             </div>
        //             <div style={{gridArea: "9 / 7 / 11 / 9"}}>
        //                 <div className="agileGrid">
        //                     <Module value={["smallModule", "CS"]} row="4" col="1 / 8" height="25px" />
        //                     <Module value={["smallModule", "MPD"]} row="5" col="1 / 4" height="25px" />
        //                     <Module value={["smallModule", "MPD"]} row="5" col="5 / 8" height="25px" />
        //                     <Module value={["smallModule", "SB"]} row="3" col="6 / 8" height="25px" />
        //                     <Module value={["smallModule", "MPD"]} row="9" col="2 / 7" height="25px" />
        //
        //                     <Arrow row="2" col="1 / 8" x1="0" x2="190" y1="10" y2="10" text="Stage 1 Timebox" strokeWidth="15" />
        //                 </div>
        //             </div>
        //             <div style={{gridArea: "9 / 10 / 11 / 12"}}>
        //                 <div className="agileGrid">
        //                     <Module value={["smallModule", "CS"]} row="4" col="1 / 8" height="25px" />
        //                     <Module value={["smallModule", "MPD"]} row="5" col="1 / 4" height="25px" />
        //                     <Module value={["smallModule", "MPD"]} row="6" col="5 / 8" height="25px" />
        //                     <Module value={["smallModule", "SB"]} row="3" col="6 / 8" height="25px" />
        //                     <Module value={["smallModule", "MPD"]} row="9" col="2 / 7" height="25px" />
        //
        //                     <Arrow row="2" col="1 / 8" x1="0" x2="190" y1="10" y2="10" text="Stage 2 Timebox" strokeWidth="15" />
        //                 </div>
        //             </div>
        //             <div style={{gridArea: "9 / 13 / 11 / 14"}}>
        //                 <div className="agileGrid">
        //                     <Module value={["smallModule", "CS"]} row="4" col="1 / 7" height="25px" />
        //                     <Module value={["smallModule", "MPD"]} row="5" col="1 / 3" height="25px" />
        //                     <Module value={["smallModule", "CP"]} row="3" col="5 / 7" height="25px" />
        //
        //                     <Arrow row="2" col="1 / 7" x1="0" x2="150" y1="10" y2="10" text="Final Stage Timebox" strokeWidth="15" />
        //                 </div>
        //             </div>
        //         </div>
        //    </div>
        //);
    }
}

ReactDOM.render(<View />,  document.getElementById('root'));
export default View;
