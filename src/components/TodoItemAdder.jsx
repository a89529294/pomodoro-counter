import React from "react";

class TodoItemAdder extends React.Component {
  state = {
    title: "",
    description: ""
  };

  handleFormSubmit = e => {
    e.preventDefault();
    if (!this.state.title || !this.state.description) {
      return;
    }
    this.props.handleTodoItemSubmit(this.state.title, this.state.description);
    this.setState({
      title: "",
      description: ""
    });
  };

  handleTodoTitle = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleTodoDescription = e => {
    this.setState({
      description: e.target.value
    });
  };

  render() {
    const todoNum = this.props.todoList.length;
    const todoMaxNum = 10;
    return (
      <div className="todo-item-adder-outer-container">
        <div className="todo-item-adder-container">
          <form className="todo-form" onSubmit={this.handleFormSubmit}>
            <input
              value={this.state.title}
              onChange={this.handleTodoTitle}
              className="todo-item-title"
              placeholder="category"
              disabled={todoNum >= todoMaxNum}
              required
            />
            <input
              className="todo-item-description"
              placeholder="short description"
              onChange={this.handleTodoDescription}
              value={this.state.description}
              disabled={todoNum >= todoMaxNum}
              required
            />
            <button
              disabled={todoNum >= todoMaxNum}
              className="todo-submit-btn"
              type="submit"
            >
              +
            </button>
          </form>
        </div>
        {todoNum >= todoMaxNum
          ? "Finish some tasks first before adding more!"
          : null}
      </div>
    );
  }
}

export default TodoItemAdder;
