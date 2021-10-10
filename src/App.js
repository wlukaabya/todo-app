import React, { Component } from "react";
import NavBar from "./components/NavBar";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";

class App extends React.Component {
  state = {
    todos: [
      { id: 1, text: "I need to clean my room", checkStatus: false },
      { id: 2, text: "I need to wash my clothes", checkStatus: false },
      { id: 3, text: "I need to walk my dog", checkStatus: false },
      { id: 4, text: "I need to pray", checkStatus: false },
      { id: 5, text: "I need to code", checkStatus: false },
    ],
    newTodo: "",
  };

  handleAddTodo = (e) => {
    e.preventDefault();
    const todos = [...this.state.todos];
    const id = Math.floor(Math.random() * 100);
    const index = todos.length;
    todos[index] = { id: id, text: this.state.newTodo, checkStatus: false };
    this.setState({ todos });
    var newTodo = this.state.newTodo;
    newTodo = "";
    this.setState({ newTodo });
  };
  handleChange = (todo) => {
    const newTodo = todo.target.value;
    this.setState({ newTodo });
  };
  handleDelete = (id) => {
    console.log(id);
    const todos = this.state.todos.filter((c) => c.id !== id);
    this.setState({ todos });
  };
  handleCheck = (e, todo) => {
    const todos = [...this.state.todos];
    const index = todos.indexOf(todo);
    todos[index].checkStatus =
      todos[index].checkStatus === false ? e.target.checked : false;
    this.setState({ todos });
  };
  handleDeleteTodos = () => {
    const todos = this.state.todos.filter((t) => t.checkStatus === false);
    this.setState({ todos });
  };

  render() {
    return (
      <div>
        <NavBar />
        <TodoForm
          addTodo={this.handleAddTodo}
          handleValue={this.handleChange}
          newTodo={this.state.newTodo}
        />
        <Todos
          todos={this.state.todos}
          onDelete={this.handleDelete}
          onCheck={this.handleCheck}
          onDeleteTodos={this.handleDeleteTodos}
        />
      </div>
    );
  }
}

export default App;
