import React, { Component } from "react";
import "./App.css";
import Nav from "./Nav";
import CountDownBox from "./CountDownBox";
import TodoItemAdder from "./TodoItemAdder";
import TodoItemList from "./TodoItemList";
class App extends Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem("pomodoroDuration")) {
      localStorage.setItem("pomodoroDuration", 25);
    }
    if (!localStorage.getItem("breakDuration")) {
      localStorage.setItem("breakDuration", 5);
    }

    this.state = {
      pomodoroMinute: +JSON.parse(localStorage.getItem("pomodoroDuration")),
      pomodoroSecond: 0,
      breakMinute: +JSON.parse(localStorage.getItem("breakDuration")),
      breakSecond: 0,
      todoList: JSON.parse(localStorage.getItem("todoList")),
      finishedTodoList: JSON.parse(localStorage.getItem("finishedList"))
    };
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
  }

  handleMinuteChange(pMin, bMin) {
    localStorage.setItem("pomodoroDuration", pMin);
    localStorage.setItem("breakDuration", bMin);
    this.setState({
      pomodoroMinute: pMin,
      breakMinute: bMin,
      pomodoroSecond: 0,
      breakSecond: 0
    });
  }

  handleTodoItemSubmit = (title, description) => {
    const id = Math.random();
    this.setState(function(prevState) {
      let newTodoList = prevState.todoList;
      newTodoList.push({ title, description, id, editable: false });
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      return { todoList: newTodoList };
    });
  };

  handleTodoItemDelete = id => {
    let newTodoList = this.state.todoList.filter(todoItem => {
      return todoItem.id != id;
    });

    let newFinishedTodoList = this.state.finishedTodoList.filter(todoItem => {
      return todoItem.id != id;
    });

    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    localStorage.setItem("finishedList", JSON.stringify(newFinishedTodoList));

    this.setState({
      todoList: newTodoList,
      finishedTodoList: newFinishedTodoList
    });
  };

  handleTodoItemInProgressOrDoneToggle = id => {
    const { todoList, finishedTodoList } = this.state;
    let inProgressTodo = todoList.find((item, index) => {
      if (item.id == id) {
        todoList.splice(index, 1);
        return true;
      }
    });
    let doneTodo = finishedTodoList.find((item, index) => {
      if (item.id == id) {
        finishedTodoList.splice(index, 1);
        return true;
      }
    });

    if (inProgressTodo) {
      finishedTodoList.push(inProgressTodo);
      // const todoListInStorage = localStorage.getItem('todoList');
      // const finishedListInStorage = localStorage.getItem('finishedList');

      // if (!finishedListInStorage){
      //   finishedListInStorage = [];
      // }
    } else {
      todoList.push(doneTodo);
    }

    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("finishedList", JSON.stringify(finishedTodoList));

    this.setState({
      todoList: todoList,
      finishedTodoList: finishedTodoList
    });
  };

  handleTodoItemEdit = id => {
    console.log(2);
    let newtodoList = this.state.todoList.slice(0);
    let newFinishedTodoList = this.state.finishedTodoList.slice(0);

    newtodoList = newtodoList.map(item => {
      if (item.id == id) {
        item.editable = !item.editable;
      }
      return item;
    });

    newFinishedTodoList = newFinishedTodoList.map(item => {
      if (item.id == id) {
        item.editable = !item.editable;
      }
      return item;
    });

    this.setState({
      todoList: newtodoList,
      finishedTodoList: newFinishedTodoList
    });
  };

  handleTodoItemSave = (id, title, description) => {
    this.state.todoList.find(item => {
      if (item.id == id) {
        item.title = title;
        item.description = description;
        return true;
      }
    });
    this.setState({
      todoList: this.state.todoList
    });
  };

  render() {
    const {
      pomodoroMinute,
      pomodoroSecond,
      breakMinute,
      breakSecond
    } = this.state;
    return (
      <div className="outermost-flex-container">
        <Nav
          handleMinuteChange={this.handleMinuteChange}
          pomodoroMinute={this.state.pomodoroMinute}
          breakMinute={this.state.breakMinute}
        />
        <div className="left-div" />
        <CountDownBox
          pomodoroMinute={pomodoroMinute}
          pomodoroSecond={pomodoroSecond}
          breakMinute={breakMinute}
          breakSecond={breakSecond}
        />
        <div className="right-div" />
        <div className="todo-container">
          <div className="todo-header">
            <h4 className="c-header">TODO</h4>
            <TodoItemAdder
              handleTodoItemSubmit={this.handleTodoItemSubmit}
              todoList={this.state.todoList}
            />
            <TodoItemList
              todoList={this.state.todoList}
              handleTodoItemDelete={this.handleTodoItemDelete}
              handleTodoItemInProgressOrDoneToggle={
                this.handleTodoItemInProgressOrDoneToggle
              }
              handleTodoItemEdit={this.handleTodoItemEdit}
              handleTodoItemSave={this.handleTodoItemSave}
            />
          </div>
          <div className="todo-header">
            <h4 className="c-header">DONE</h4>
            <TodoItemList
              todoList={this.state.finishedTodoList}
              handleTodoItemDelete={this.handleTodoItemDelete}
              handleTodoItemInProgressOrDoneToggle={
                this.handleTodoItemInProgressOrDoneToggle
              }
              doneList={true}
              handleTodoItemEdit={this.handleTodoItemEdit}
              handleTodoItemSave={this.handleTodoItemSave}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
