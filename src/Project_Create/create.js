import React from "react";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import './create.css'
import _ from "lodash";


const ReactGridLayout = WidthProvider(Responsive);
const originalLayout = getFromLS("layout") || [];


/**
 * This layout demonstrates how to sync to localstorage.
 */
export default class LocalStorageLayout extends React.PureComponent {
  
  static defaultProps = {
    className: "layout",
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 30,
    verticalCompact: false,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);
    // this.state = {
    //   layout: JSON.parse(JSON.stringify(originalLayout))
    // };

    this.state = {
      // layout: JSON.parse(JSON.stringify(originalLayout))
      
      layout: [1, 2, 3, 4, 5, 12].map(function(i, key, list) {
        return {
          i : i.toString(),
          x : i * 2, y: 0, w: 2, h: 2,
          add: i === (list.length - 1)
        };
      }),
      toolboxElements: [
        {i: "t0", h: 1, maxH: 1, w: 1, class: "arrow_box"},
        {i: "t1", h: 1, w: 3, class: "draggable"}
      ],
      newCounter: 0
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i
    return (
      <div key={i} data-grid={el}>
        {el.add ? (
          <span className="add text" onClick={this.onAddItem}
                title="You can add an item by clicking here">
            Add +
          </span>

        ) : (
          <span className="text">{i}</span>
        )}
        <span className="remove" style={removeStyle}
              onClick={this.onRemoveItem.bind(this, i)}>
          x
        </span>
      </div>
    );
  }
  
  onAddItem() {
    this.setState({
      layout: this.state.layout.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.layout.length * 2) % (this.state.cols || 12),
        y: Infinity, w: 2, h: 2
      }),
      newCounter: this.state.newCounter + 1
    });
  }


  // onAddItem(template, elemParams) {
  //   this.setState({
  //     layout: this.state.layout.concat(
  //       {id: this.state.newCounter.toString(), w: template.w, h: template.h, maxH: template.maxH, class: template.class },
        
  //     ),
  //     newCounter: this.state.newCounter + 1
  //   });
  // }

  resetLayout() {
    this.setState({
      layout:[]
    });
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
  }

  onRemoveItem(i) {
    this.setState({ items: _.reject(this.state.items, {i: i})});
  }  



  onBreakpointChange(breakpoint, cols) {
      this.setState({
        breakpoint: breakpoint,
        cols: cols
      });
  }

  onDragStart = (event, templateID) => {
      console.log('Beginning dragStart on div: ', templateID);        
    	event.dataTransfer.setData("templateID", templateID);
  }
  onDrop (event, elemParams) {
    let templateID = event.dataTransfer.getData("templateID");
    this.state.toolboxElements.filter((template) => {
      if(template.i === templateID) {
        this.onAddItem(template, elemParams);
      }
    });
  }

  //=============================================================
  // render() {
  //   return (
  //     <div>
        
  //       <div>
  //         <button onClick={(event)=>this.resetLayout}>Reset Layout</button> 
  //         <button onClick={(event)=>this.onAddItem}>Add Element</button>
  //         <div id="container">

  //           <div id="toolbox">
  //             <div class="draggable" key="34" data-grid={{w: 2, h: 3, x: 0, y: 0}}>
  //               <span className="text">1</span>
  //             </div>
  //           </div>

  //           <div id="workspace">
  //             <ReactGridLayout
  //               {...this.props}
  //               layout={this.state.layout}
  //               onLayoutChange={this.onLayoutChange}
  //             >
  //               <div className="draggable" key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0 }}>
  //                 <span className="text">1</span>
  //               </div>
  //               <div className="draggable" key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0 }}>
  //                 <span className="text">2</span>
  //               </div>
  //               <div className="draggable" key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0 }}>
  //                 <span className="text">3</span>
  //               </div>
  //               <div className="arrow_box" key="4" data-grid={{ w: 2, h: 1, x: 6, y: 0, maxH: 1 }}>
  //                 <span className="text">4</span>
  //               </div>
  //               <div className="arrow_box" key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0 }}>
  //                 <span className="text">5</span>
  //               </div>
  //             </ReactGridLayout>
  //           </div>
  //          </div>
  //        </div>
  //      </div>
  //   );
  // }
  //=====================================================

  render() {
    var items = {
        template: [],
        agile: [],
        prince2: []      
    }

		this.state.layout.forEach ((item) => {
		  items["agile"].push(
        <div key={item.i} data-grid={{w: item.w, h: item.h, x: item.x, y: item.y}}
              style = {{backgroundColor: "cyan"}}>
          <span> {item.i} </span>
        </div>
      );
    });

    // Pulls from the templates and creates div elements for them.
    this.state.toolboxElements.forEach ((temp) => {
      items["template"].push(
        <div key={temp.i} data-grid={{w: temp.w, h: temp.h, x: temp.x, y: temp.y}}
             className = {temp.class}
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
            isDroppable={true}
            onDrop={(event)=>{this.onAddItem()}}
            onBreakpointChange={this.onBreakpointChange}
            {...this.props} 
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
