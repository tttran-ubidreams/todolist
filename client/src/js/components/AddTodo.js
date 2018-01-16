import React from 'react';
import {graphql, compose} from 'react-apollo';
import {FormControl, Button} from 'react-bootstrap';

import {addTodoMutation} from '../gql/mutations';
import {getTodosQuery} from '../gql/queries';

class AddTodo extends React.Component {
  _handleAddTodo = (event) => {
    event.preventDefault();

    this.props.submit(this.state.todoText);

    this.setState({
      todoText: ''
    });
  }

  _handleOnChange = (event) => {
    this.setState({
      todoText: event.target.value
    });
  }

  constructor(props) {
    super(props);

    this.state = {todoText: ''};
  }

  render() {
    return (
      <div>
        <form className="addItemForm" onSubmit={this._handleAddTodo}>
          <FormControl type="text" value={this.state.todoText} onChange={this._handleOnChange}/>
          <Button type="submit">Add</Button>
        </form>
      </div>
    );
  }
}

const mapResultsToProps = ({data, mutate}) => {
  return {
    submit: (text) => mutate({
      variables: {text},
      update: (store, {data: {addTodo}}) => {
        const data = store.readQuery({query: getTodosQuery});

        data.getTodos.push(addTodo);
        store.writeQuery({query: getTodosQuery, data});
      },
      optimisticResponse: {
        addTodo: {
          text: text,
          id: Math.round(Math.random() * -1000000),
          __typename: 'Todo',
        },
      }
    })
  };
};

const mapPropsToOptions = () => {
  return {};
};

export default compose(graphql(addTodoMutation, {
  props: mapResultsToProps,
  options: mapPropsToOptions,
}))(AddTodo);
