import React, { Component } from "react";
import Todo from "./Todo";

const Todos = ({ todos, onDelete, onCheck, onDeleteTodos, deletedIds }) => {
  return (
    <div className="container bg-light text-success p-2 ">
      {todos.map((t) => {
        return (
          <Todo
            ids={deletedIds}
            todo={t}
            todos={todos}
            key={t.todo_id}
            onDelete={onDelete}
            onCheck={onCheck}
          />
        );
      })}
      {todos.length == 0 ? null : (
        <button
          className="btn btn-sm btn-warning "
          onClick={() => onDeleteTodos(deletedIds)}
        >
          Delete Todos
        </button>
      )}
    </div>
  );
};

export default Todos;
