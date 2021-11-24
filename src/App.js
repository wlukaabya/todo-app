import React, { Component, useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [deletedTodo, setDeletedTodo] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const [deletedIds, setDeletedIds] = useState([]);
  const [updatedTodo, setUpdatedTodo] = useState("");

  useEffect(() => {
    mountTodos();
  });

  const mountTodos = () => {
    axios.get(`http://localhost:5000/todos`).then((res) => {
      const arr = [...res.data];
      const check = { checkStatus: false };
      const todos = arr.map((t) => {
        return Object.assign(t, check);
      });

      setTodos(todos);
    });
  };

  const handleAddTodo = (e, text) => {
    e.preventDefault();
    const updatedTodo = text;
    if (text.length !== 0) {
      const description = text;
      axios.post(`http://localhost:5000/todos/${description}`).then((res) => {
        console.log(res.data);
      });
    } else return null;
    setUpdatedTodo(updatedTodo);
    const newTodo = "";
    setNewTodo(newTodo);
  };

  const handleChange = (todo) => {
    const newTodo = todo.target.value;
    setNewTodo(newTodo);
  };
  const handleDelete = (todo) => {
    const deletedId = todo.todo_id;
    axios.delete(`http://localhost:5000/todos/${[deletedId]}`).then((res) => {
      console.log(res.data);
    });
    setDeletedId(deletedId);
  };

  const handleCheck = (e, todo, ids) => {
    ids.push(todo.todo_id);
    setDeletedIds(ids);
  };

  const handleDeleteTodos = (ids) => {
    ids.forEach((id) => {
      axios.delete(`http://localhost:5000/todos/${id}`).then((res) => {
        console.log(res.data);
      });
    });
    ids = [];
    setDeletedIds(ids);
  };

  return (
    <div>
      <NavBar />
      <TodoForm
        addTodo={handleAddTodo}
        handleValue={handleChange}
        newTodo={newTodo}
      />
      <Todos
        todos={todos}
        onDelete={handleDelete}
        onCheck={handleCheck}
        onDeleteTodos={handleDeleteTodos}
        deletedIds={deletedIds}
      />
    </div>
  );
};

export default App;
