import React, { Component } from "react";
import Todo from "./Todo";

class Todos extends React.Component {
  render() {
    const { todos, onDelete, onCheck, onDeleteTodos } = this.props;
    return (
      <div className="container bg-light text-success p-2 ">
        {todos.map((t) => {
          return (
            <Todo
              todo={t}
              key={t.todo_id}
              onDelete={onDelete}
              onCheck={onCheck}
            />
          );
        })}
        {todos.length == 0 ? null : (
          <button className="btn btn-sm btn-warning " onClick={onDeleteTodos}>
            Delete Todos
          </button>
        )}
      </div>
    );
  }
}

export default Todos;
