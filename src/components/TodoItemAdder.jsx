import React from "react";

class TodoItemAdder extends React.Component {
  state = {
    title: "",
    description: ""
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const titleInput = document.querySelector(".todo-item-title");
    const descriptionInput = document.querySelector(".todo-item-description");
    const errorMsgDiv = document.querySelector(".error-msg-div");
    if (!this.state.title || !this.state.description) {
      titleInput.classList.add("empty-input");
      descriptionInput.classList.add("empty-input");
      errorMsgDiv.innerHTML = "Do not leave the input field(s) empty!";

      //clear the errors after 5 seconds
      setTimeout(() => {
        titleInput.classList.remove("empty-input");
        descriptionInput.classList.remove("empty-input");
        errorMsgDiv.innerHTML = "";
      }, 5000);

      return;
    } else {
      titleInput.classList.remove("empty-input");
      descriptionInput.classList.remove("empty-input");
    }
    this.props.handleTodoItemSubmit(this.state.title, this.state.description);
    this.setState({
      title: "",
      description: ""
    });
  };

  handleTodoTitle = e => {
    if (e.target.value) {
      const titleInput = document.querySelector(".todo-item-title");
      const errorMsgDiv = document.querySelector(".error-msg-div");
      titleInput.classList.remove("empty-input");
      if (this.state.description) {
        errorMsgDiv.innerHTML = "";
      }
    }
    this.setState({
      title: e.target.value
    });
  };

  handleTodoDescription = e => {
    if (e.target.value) {
      const descriptionInput = document.querySelector(".todo-item-description");
      const errorMsgDiv = document.querySelector(".error-msg-div");
      descriptionInput.classList.remove("empty-input");
      if (this.state.title) {
        errorMsgDiv.innerHTML = "";
      }
    }
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
              minLength={1}
              maxLength={20}
            />
            <input
              className="todo-item-description"
              placeholder="short description"
              onChange={this.handleTodoDescription}
              value={this.state.description}
              disabled={todoNum >= todoMaxNum}
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
        <div className="error-msg-div">
          {todoNum >= todoMaxNum
            ? "Finish some tasks first before adding more!"
            : null}
        </div>
      </div>
    );
  }
}

export default TodoItemAdder;
