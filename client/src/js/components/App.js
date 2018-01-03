import React from 'react';
import TodoList from './TodoList'
import AddTodo from './AddTodo'

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
      <div>
        <AddTodo/>
        <TodoList/>
      </div>
    );
  }
}

