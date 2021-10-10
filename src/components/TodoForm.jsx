import React, { Component } from "react";

class TodoForm extends React.Component {
  render() {
    const { addTodo, handleValue, newTodo } = this.props;
    return (
      <div>
        <form className="form-inline mt-2">
          <div className="form-group mx-sm-3 mb-2 ">
            <input
              type="text"
              className="form-control"
              value={newTodo}
              placeholder="Enter your task"
              onChange={(value) => handleValue(value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={(e) => addTodo(e)}
          >
            Add Task
          </button>
        </form>
      </div>
    );
  }
}

export default TodoForm;
