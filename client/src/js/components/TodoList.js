import React from 'react';
import {graphql} from 'react-apollo';

import {getTodosQuery} from '../gql/queries'

class TodoList extends React.Component {

  render() {
    let {todos} = this.props;

    return (
      <div>
        {
          todos && todos.map(todo => {
            return (
              <li key={todo.id}>{todo.text}</li>
            );
          })
        }
      </div>
    )
  }
}



const mapResultsToProps = ({data}) => {
  console.log(data)
  return {
    loading: data.loading,
    error: data.error,
    todos: data.getTodos,
  };
};

const mapPropsToOptions = () => {
  return {
    pollInterval: 5000,
  };
};

export default graphql(getTodosQuery, {
  props: mapResultsToProps,
  options: mapPropsToOptions,
})(TodoList);