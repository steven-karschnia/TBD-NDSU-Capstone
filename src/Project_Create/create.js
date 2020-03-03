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

    // this.state = {
    //   layout: JSON.parse(JSON.stringify(originalLayout))
    // };
    this.state = {
      items: [
        {i: "1",  w: 2, h: 3, x: 0, y: 0 },
        {i: "2",  w: 2, h: 3, x: 2, y: 0 }, 
        {i: "3",  w: 2, h: 3, x: 0, y: 0 },
        {i: "4",  w: 2, h: 3, x: 0, y: 0 },
        {i: "5",  w: 2, h: 3, x: 0, y: 0 }
      ],
      newCounter: 6
    };
    this.onBreakpointChange.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }

  createElement(element) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = element.add ? "+" : element.i;
    return (
      <div key={i} data-grid={element}>
        {element.add ? (
          <span className="addText" onClick={this.onAddItem}>
            Add+
          </span>
        ):(
          <span className="text">{i}</span>
        )}
        <span className="remove" style={removeStyle}>
          x
        </span>
      </div>
    );
  }

  onAddItem() {
    console.log("Adding", this.state.counter);
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

  onAddItem() {
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





  render() {
    var items = {
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
    

  return (
      <div>
        <button  onClick={(event)=>this.onAddItem()}>Add Element</button>
        <ReactGridLayout
          onLayoutchange={this.onLayoutChange}
          // onBreakpointChange={this.onBreakpointChange}
          {...this.props} >

            {items.agile}
          
        </ReactGridLayout>
      </div>
    )
  }


  // render() {
  //   return (
  //     <div>
  //       <button onClick={this.resetLayout}>Reset Layout</button>
  //       <ReactGridLayout
  //         {...this.props}
  //         layout={this.state.layout}
  //         onLayoutChange={this.onLayoutChange}
  //       >
  //         <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0 }} className="draggable">
  //           <span className="text">1</span>
  //         </div> 
  //         <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0 }} className="draggable">
  //           <span className="text">2</span>
  //         </div>
  //         <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0 }} className="draggable">
  //           <span className="text">3</span>
  //         </div>
  //         <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0 }} className="draggable">
  //           <span className="text">4</span>
  //         </div>
  //         <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0 }} className="draggable">
  //           <span className="text">5</span>
  //         </div>
  //       </ReactGridLayout>
  //     </div>
  //   );
  // }

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
