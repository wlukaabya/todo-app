import React, { Component } from "react";
import NavBar from "./components/NavBar";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";
import axios from "axios";

class App extends React.Component {
  state = {
    todos: [],
    newTodo: "",
    deletedTodo: null,
    deletedId: null,
    updatedTodo: "",
    deletedIds: [],
  };
  componentDidMount() {
    this.mountTodos();
  }
  componentDidUpdate(pP, pS) {
    if (this.state.deletedId !== pS.deletedId) {
      const todos = this.state.todos.filter(
        (t) => t.todo_id !== this.state.deletedId
      );
      this.setState({ todos });
    }
    if (this.state.updatedTodo != pS.updatedTodo) {
      this.mountTodos();
    }
    if (this.state.deletedIds !== pS.deletedIds) {
      const todos = this.state.todos.filter((t) => t.checkStatus === false);
      this.setState({ todos });
    }
  }

  mountTodos() {
    axios.get(`http://localhost:5000/todos`).then((res) => {
      const arr = [...res.data];
      const check = { checkStatus: false };
      const todos = arr.map((t) => {
        return Object.assign(t, check);
      });

      this.setState({ todos });
    });
  }

  handleAddTodo = (e) => {
    e.preventDefault();
    const updatedTodo = this.state.newTodo;
    if (this.state.newTodo.length !== 0) {
      const description = this.state.newTodo;
      axios.post(`http://localhost:5000/todos/${description}`).then((res) => {
        console.log(res.data);
      });
    } else return null;
    this.setState({ updatedTodo });
    const newTodo = "";
    this.setState({ newTodo });
  };

  handleChange = (todo) => {
    const newTodo = todo.target.value;
    this.setState({ newTodo });
  };
  handleDelete = (todo) => {
    const deletedId = todo.todo_id;
    axios.delete(`http://localhost:5000/todos/${[deletedId]}`).then((res) => {
      console.log(res.data);
    });
    this.setState({ deletedId });
  };

  handleCheck = (e, todo) => {
    const todos = [...this.state.todos];
    const index = todos.indexOf(todo);
    todos[index].checkStatus =
      todos[index].checkStatus === false ? e.target.checked : false;
    this.setState({ todos });
  };
  handleDeleteTodos = () => {
    const deletedIds = [];
    this.state.todos.forEach((t) => {
      const id = t.todo_id;

      if (t.checkStatus === true) {
        deletedIds.push(id);
        axios.delete(`http://localhost:5000/todos/${id}`).then((res) => {
          console.log(res.data);
        });
      }
    });
    this.setState({ deletedIds });

    //const todos = this.state.todos.filter((t) => t.checkStatus === false);
    //this.setState({ todos });
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
