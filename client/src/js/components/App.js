import React from 'react';
import TodoList from './TodoList'
import AddTodo from './AddTodo'
import '../css/index.css';

export default class App extends React.Component {
  _handleAddTodo = () => {

  }

  _handleOnChange = (event) => {
    this.setState({
      todoText: event.target.value
    });
  }

  constructor (props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="main">
        <AddTodo/>
        <TodoList/>
      </div>
    );
  }
}

