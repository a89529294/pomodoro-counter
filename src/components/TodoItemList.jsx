import React from "react";

class TodoItemList extends React.Component {
  state = {
    tempTitle: "",
    tempDescription: ""
  };
  handleTodoItemDelete = e => {
    const id = e.target.parentElement.parentElement.id;
    this.props.handleTodoItemDelete(id);
  };

  handleTodoItemInProgressOrDoneToggle = e => {
    const id = e.target.parentElement.parentElement.id;
    this.props.handleTodoItemInProgressOrDoneToggle(id);
  };

  handleTodoItemEdit = e => {
    const id = e.target.parentElement.parentElement.id;
    const targetTodoItem = this.props.todoList.find(item => {
      return item.id == id;
    });
    this.setState({
      tempTitle: targetTodoItem.title,
      tempDescription: targetTodoItem.description
    });
    this.props.handleTodoItemEdit(id);
  };

  handleTodoItemSave = e => {
    const id = e.target.parentElement.parentElement.id;
    const title = this.state.tempTitle;
    const description = this.state.tempDescription;
    this.props.handleTodoItemSave(id, title, description);
    this.props.handleTodoItemEdit(id);
  };

  handleEditTitleInList = e => {
    this.setState({
      tempTitle: e.target.value
    });
  };

  handleEditDescriptionInList = e => {
    this.setState({
      tempDescription: e.target.value
    });
  };

  render() {
    return (
      <div className="todo-list-container">
        <div className="todo-list">
          {this.props.todoList.map(
            function(item) {
              return item.editable ? (
                <div className="todo-item" id={item.id} key={item.id}>
                  <input
                    value={this.state.tempTitle}
                    onChange={this.handleEditTitleInList}
                  />
                  <input
                    value={this.state.tempDescription}
                    onChange={this.handleEditDescriptionInList}
                  />
                  <div
                    className="todo-item-option-wrap"
                    onClick={this.handleTodoItemSave}
                  >
                    <div className="todo-item-option">🗸</div>
                    <div className="todo-item-option-description">save</div>
                  </div>

                  <div
                    className="todo-item-option-wrap"
                    onClick={this.handleTodoItemEdit}
                  >
                    <div className="todo-item-option">🔙</div>
                    <div className="todo-item-option-description">back</div>
                  </div>
                </div>
              ) : (
                <div className="todo-item" id={item.id} key={item.id}>
                  {item.title} - {item.description}
                  {!this.props.doneList ? (
                    <div
                      className="todo-item-option-wrap"
                      onClick={this.handleTodoItemEdit}
                    >
                      <div
                        className="todo-item-option"
                        data-tool-tip-edit={"edit"}
                      >
                        🔨
                      </div>
                    </div>
                  ) : null}
                  <div
                    className="todo-item-option-wrap"
                    onClick={this.handleTodoItemDelete}
                  >
                    <div
                      className="todo-item-option"
                      data-tool-tip-delete={"delete"}
                    >
                      ➖
                    </div>
                  </div>
                  <div
                    className="todo-item-option-wrap"
                    onClick={this.handleTodoItemInProgressOrDoneToggle}
                  >
                    <div
                      className="todo-item-option"
                      data-tool-tip-checkmark={
                        this.props.doneList
                          ? "Move back to TODO"
                          : "Mark as done"
                      }
                    >
                      ✔️
                    </div>
                  </div>
                </div>
              );
            }.bind(this)
          )}
        </div>
      </div>
    );
  }
}

export default TodoItemList;
