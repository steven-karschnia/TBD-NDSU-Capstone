import React, { Component } from "react";
import ReactDOM from "react-dom";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import RGL, { WidthProvider } from "react-grid-layout";
import "./create.css";
import "react-resizable/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

var counter = 0;
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  sourceClone.forEach((item, index) => {
    counter = counter + 1;
    item.w = 2;
    item.h = 2;
    item.x = 0;
    item.y = 0;
  });
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];
  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const deleteItem = (source, droppableSource) => {
  const sourceClone = Array.from(source);
  sourceClone.splice(droppableSource.index, 1);
};

/* This is to style the JSX elements. I'm not sure how to 
   make this work when they are in a different file. Make sure
   to install the package with the command: npm install --save styled-components */

const Content = styled.div`
  margin-right: 200px;
`;

const Item = styled.div`
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  border-radius: 3px;
  background: #fff;
  overflow: hidden;
  /* background: ${(props) => (props.isDragging ? "red" : "blue")}; */
  border: 1px ${(props) => (props.isDragging ? "dashed #000" : "solid #ddd")};
`;

const ItemDropped = styled(Item)`
  line-height: calc(75%);
  @media (max-width: 768px) {
    font-size: 8px;
    text-align: left;
  }
`;

const Clone = styled(Item)`
  + div {
    display: none !important;
  }
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  margin: -0.5rem 0.5rem -0.5rem -0.5rem;
  padding: 0.5rem;
  line-height: 1.5;
  border-radius: 3px 0 0 3px;
  background: #fff;
  border-right: 1px solid #ddd;
  color: #000;
`;

const List = styled.div`
  border: 1px
    ${(props) => (props.isDraggingOver ? "dashed #000" : "solid #ddd")};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
`;

const Kiosk = styled(List)`
  position: absolute;
  top: 20%;
  left: 0.5%;
  bottom: 20%;
  width: 200px;
`;

const Container = styled(List)`
  position: absolute;
  top: 20%;
  left: 15%;
  bottom: 20%;
  width: 83%;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;

const Button = styled.button`
  display: flex;
  position: absolute;
  right: 35%;
  top: 13%;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
`;

const ButtonText = styled.div`
  margin: 0 1rem;
`;

const removeStyle = {
  // For the remove icon
  position: "absolute",
  right: "2px",
  top: 0,
  cursor: "pointer",
};

const ITEMS = [
  {
    id: uuid(),
    content: "Item 1",
  },
  {
    id: uuid(),
    content: "Item 2",
  },

  {
    id: uuid(),
    content: "Item 3",
  },
  {
    id: uuid(),
    content: "Item 4",
  },
  {
    id: uuid(),
    content: "Arrow",
    class: "arrow",
  },
];

const ARROW = [
  {
    id: uuid(),
    content: "Arrow",
  },
];

export default class LocalStorageLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      [uuid()]: [],
    };
  }
  static defaultProps = {
    className: "layout",
    // items: 20,
    rowHeight: 30,
    onLayoutChange: function () {},
    cols: 12,
  };
  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          [destination.droppableId]: reorder(
            this.state[source.droppableId],
            source.index,
            destination.index
          ),
        });
        break;
      case "ITEMS":
        this.setState({
          [destination.droppableId]: copy(
            ITEMS,
            this.state[destination.droppableId],
            source,
            destination
          ),
        });
        break;
      default:
        this.setState(
          move(
            this.state[source.droppableId],
            this.state[destination.droppableId],
            source,
            destination
          )
        );
        break;
    }
  };

  addList = (e) => {
    this.setState({ [uuid()]: [] });
  };

  // For removing items
  onRemoveItem = (result) => {
    const { source } = result;
    this.setState(deleteItem(source));
  };

  onLayoutChange(layout) {
    console.log("onLayoutChange", layout);
    this.props.onLayoutChange(layout);
  }

  resetLayout() {
    this.setState({
      layout: [],
    });
  }

  async saveLayout() {
    console.log(this.state.layout);
    var layoutData = {
      name: "Test",
      company: "TBD",
      data: { elements: [] },
    };
    var elements = [];
    for (var i = 0; i < this.state.layout.length; i++) {
      var element = this.state.layout[i];
      var item = {
        x: Math.round(element.x),
        y: Math.round(element.y),
        w: Math.round(element.w),
        h: Math.round(element.h),
        progress: element.progress,
        type: element.type,
      };
      elements.push(item);
    }
    layoutData.data.elements = elements;
    layoutData.data = JSON.stringify(layoutData.data);
    const req = await fetch(
      "http://127.0.0.1:8000/projects/" + this.state.project + "/",
      {
        method: "PUT",
        headers: new Headers({
          Authorization: "Basic cm9vdDpyb290",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(layoutData),
      }
    );
    console.log(await req);
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    // console.log(this.state.itemHt, "itemHt");
    return (
      <div>
        <div class="ddList">
          <select class="layoutType">
            <option value="Agile">Agile</option>
            <option value="Prince2">Prince2</option>
          </select>
        </div>
        <div>
          <Button /*onClick={this.addList}*/>
            {" "}
            {/* We need a way to change grids between Prince2 and Agile*/}
            <ButtonText>Save Layout</ButtonText>
          </Button>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="ITEMS" isDropDisabled={true}>
            {(provided, snapshot) => (
              <Kiosk
                ref={provided.innerRef}
                className="kiosk"
                isDraggingOver={snapshot.isDraggingOver}
              >
                {ITEMS.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <Item
                          className="item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                          style={provided.draggableProps.style}
                        >
                          {item.content}
                        </Item>
                        {snapshot.isDragging && (
                          <Clone className="clone">{item.content}</Clone>
                        )}
                      </React.Fragment>
                    )}
                  </Draggable>
                ))}
              </Kiosk>
            )}
          </Droppable>
          <Content className="content DashPreview-PreviewList">
            {Object.keys(this.state).map((list, i) => (
              <Droppable key={list} droppableId={list}>
                {(provided, snapshot) => (
                  <Container
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    <ReactGridLayout
                      // key={"gridlayout"}
                      isResizable={true}
                      isDroppable={true}
                      style={{
                        overflow: "auto",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        bottom: "0",
                        right: "0",
                        height: "99.99%",
                      }}
                      onLayoutChange={this.onLayoutChange.bind(this)}
                      {...this.props}
                    >
                      {this.state[list].length ? (
                        this.state[list].map((item, index) => (
                          <ItemDropped
                            key={"item" + index}
                            data-grid={{
                              x: item.x,
                              y: item.y,
                              w: item.w,
                              h: item.h,
                            }}
                          >
                            {/* <span
                              style={removeStyle}
                              onClick={this.onRemoveItem.bind()}
                            >
                              X
                            </span> */}
                            {item.content}
                          </ItemDropped>
                        ))
                      ) : (
                        <Notice>Drop items here</Notice>
                      )}
                    </ReactGridLayout>
                    {provided.placeholder}
                  </Container>
                )}
              </Droppable>
            ))}
          </Content>
        </DragDropContext>
      </div>
    );
  }
}
