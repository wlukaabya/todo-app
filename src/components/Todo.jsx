import React, { Component } from "react";

class Todo extends React.Component {
  render() {
    const { todo, onDelete, onCheck } = this.props;

    return (
      <span className=" border-bottom d-flex flex-row align-items-baseline justify-content-between m-2">
        <input
          type="checkbox"
          className="checkbox"
          onChange={(e) => onCheck(e, todo)}
        />
        <p>{todo.description}</p>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(todo)}
        >
          Delete
        </button>
      </span>
    );
  }
}

export default Todo;
