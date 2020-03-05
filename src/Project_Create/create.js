import React from "react";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import './create.css'
const ReactGridLayout = WidthProvider(Responsive);



// This is the variable storing the project layout
const originalLayout = getFromLS("layout") || [];


/**
 * This layout demonstrates how to sync to localstorage.
 */
export default class LocalStorageLayout extends React.PureComponent {
  
  static defaultProps = {
    className: "layout",
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 30,
    onLayoutChange: function() {}
  };



  constructor(props) {
    super(props);
    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout)),
      items: [
        {i: "1",  w: 2, h: 3, x: 0, y: 0, className: "draggable"},
        {i: "2",  w: 2, h: 3, x: 2, y: 0, className: "draggable1" }, 
        {i: "3",  w: 2, h: 3, x: 0, y: 0, className: "draggable2" },
        {i: "4",  w: 2, h: 3, x: 0, y: 0, className: "draggable3" },
        {i: "5",  w: 2, h: 3, x: 0, y: 0, className: "arrow_box" }
      ],
      templates: [
        {i: "1", w: 3, h: 4, x: 0, y: 0}
      ],
      newCounter: 6
    };
    this.onBreakpointChange.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }

  onAddItem(event) {
    this.setState({
        items: this.state.items.concat({
          i: this.state.newCounter,
          x: (this.state.items.length * 2) % (this.state.cols || 12),
          y: Infinity,
          w: 2,
          h: 2  
        }),
        newCounter: this.state.newCounter + 1
    });
  }

  // onAddItem(event) {
  //   let tempId = event.dataTransfer.getData("tempId");
    
  //   this.state.templates.filter((temp) => { 
  //     if (temp.i === tempId) {
  //       this.setState({
  //         items: this.state.items.concat({
  //           i: this.state.newCounter,
  //           x: temp.x,
  //           y: Infinity,
  //           w: temp.w,
  //           h: temp.h
  //         }),
  //         newCounter: this.state.newCounter + 1
  //       })
  //     }
  //   });
  // }
  

  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    })
  }


  resetLayout() {
    this.setState({
      layout: []
    });
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
  }

  onDragStart = (event, itemID) => {
      console.log('Beginning dragStart on div: ', itemID);        
    	event.dataTransfer.setData("taskID", itemID);
	}



  render() {
    var items = {
        template: [],
        agile: [],
        prince2: []      
    }

		this.state.items.forEach ((item) => {
		  items["agile"].push(
        <div key={item.i} data-grid={{w: item.w, h: item.h, x: item.x, y: item.y}}
              style = {{backgroundColor: "cyan"}}>
          <span> {item.i} </span>
        </div>
      );
    });

    // Pulls from the templates and creates div elements for them.
    this.state.templates.forEach ((temp) => {
      items["template"].push(
        <div key={temp.i} data-grid={{w: temp.w, h: temp.h, x: temp.x, y: temp.y}}
             style={{backgroundColor: "cyan"}}
             onDragStart = {(event) => this.onDragStart(event, temp.i)}
             draggable >
              <span> {temp.i} </span>
          </div>
      )
    });
    

  return (
      <div>
        <button  onClick={(event)=>this.onAddItem()}>Add Element</button>
        <div id="container">

          <div id="toolbox">
            {items.template}
          </div>

          <div id="workspace">
            <ReactGridLayout
            onLayoutchange={this.onLayoutChange}
            onDrop={(event)=>{this.onAddItem(event)}}
            
            // onBreakpointChange={this.onBreakpointChange}
            {...this.props} 
            measureBeforeMount={false}
            useCSSTransforms={this.state.mounted}
            >
              {items.agile}
            </ReactGridLayout>
          </div>
        </div>
      </div>
    )
  }
}



function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
