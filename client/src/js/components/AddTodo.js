import React from 'react';
import {graphql, compose} from 'react-apollo';

import {addTodoMutation} from '../gql/mutations';

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

  constructor (props) {
    super(props);

    this.state = {todoText: ''};
  }

  render() {
    return (
      <div>
        <form onSubmit={this._handleAddTodo}>
          <input value={this.state.todoText} onChange={this._handleOnChange} />
          <button type="button" onClick={this._handleAddTodo}>Add</button>
        </form>
      </div>
    );
  }
}

const mapResultsToProps = ({data, mutate}) => {
  return {
    submit: (text) => mutate({ variables: { text } })
  };
};

const mapPropsToOptions = () => {
  return {};
};

export default compose(graphql(addTodoMutation, {
  props: mapResultsToProps,
  options: mapPropsToOptions,
}))(AddTodo);
