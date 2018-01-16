import React from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';

import {Checkbox, Glyphicon, Button} from 'react-bootstrap'
import classNames from 'classnames';

import {deleteTodo} from '../actions/action'

import {getTodosQuery, onTodoAddedSubscription, onTodoToggledSubscription} from '../gql/queries'
import {removeTodoMutation, toggleTodoMutation} from '../gql/mutations'

class TodoList extends React.Component {
  _handleRemoveTodo = (todo) => {
    this.props.removeTodo(todo);
  };

  _handleToggleTodo = (todo) => {
    this.props.toggleTodo(todo);
  };

  componentDidMount() {
    this.props.subscribeToNewTodos();
    this.props.subscribeTodoToggle();
  }

  render() {
    let {todos} = this.props;

    return (
      <div className="todoList container">
        {
          todos && todos.map(todo => {
            let itemCl = {
              "todoItem": true,
              'completedItem': todo.completed
            };

            return (
              <div key={todo.id} className={classNames(itemCl)}>
                <Checkbox
                  checked={todo.completed}
                  onClick={this._handleToggleTodo.bind(this, todo)}
                >
                  {todo.text}
                </Checkbox>
                <Button onClick={this._handleRemoveTodo.bind(this, todo)}>
                  <Glyphicon glyph="remove"/>
                </Button>
              </div>
            );
          })
        }
      </div>
    )
  }
}


const getTodos = (props) => {
  let {data} = props;

  return {
    loading: data.loading,
    error: data.error,
    todos: data.getTodos,
    subscribeToNewTodos: params => {
      return data.subscribeToMore({
        document: onTodoAddedSubscription,
        variables: {},
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newFeedItem = subscriptionData.data.todoAdded;
          return {...prev, getTodos: [...prev.getTodos, newFeedItem]}
        }
      });
    },
    subscribeTodoToggle: params => {
      return data.subscribeToMore({
        document: onTodoToggledSubscription,
        variables: {},
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newFeedItem = subscriptionData.data.todoToggled;
          return {...prev, getTodos: [...prev.getTodos, newFeedItem]}
        }
      });
    }
  };
};

const removeTodo = ({data, mutate}) => {
  return {
    removeTodo: (todo) => mutate({
      variables: {id: todo.id},
      update: (store) => {
        const data = store.readQuery({query: getTodosQuery});

        data.getTodos = data.getTodos.filter(item => item.id != todo.id);
        store.writeQuery({query: getTodosQuery, data});
      }
    })
  };
};

const toggleTodo = ({data, mutate}) => {
  return {
    toggleTodo: (todo) => mutate({
      variables: {id: todo.id},
      update: (store, props) => {
        const data = store.readQuery({query: getTodosQuery});

        data.getTodos = data.getTodos.map(item => {
          if (item.id == todo.id) {
            return {...item, completed: !item.completed}
          }

          return item
        });

        store.writeQuery({query: getTodosQuery, data});
      }
    })
  };
};

export default compose(
  graphql(getTodosQuery, {props: getTodos}),
  graphql(removeTodoMutation, {props: removeTodo}),
  graphql(toggleTodoMutation, {props: toggleTodo})
)(TodoList);