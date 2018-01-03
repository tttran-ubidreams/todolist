import { PubSub } from 'graphql-subscriptions';
import { withFilter } from 'graphql-subscriptions';
import faker from 'faker';

const todos = [
  {
    id: 1,
    text: 'todo 1'
  },
  {
    id: 2,
    text: 'todo 2'
  }
];


function getTodo(id) {
  return todos.find(todo => todo.id === id);
}

export const resolvers = {
  Query: {
    getTodos: () => {
      return todos;
    },
    getTodo: (id) => {
      return getTodo(id);
    }
  },
  Mutation: {
    addTodo: (root, args) => {
      let maxId = todos.reduce((prev, current) => (prev.id > current.id) ? prev.id : current.id, 0) ;
      const newTodo = { id: ++maxId, text: args.text };
      todos.push(newTodo);

      return newTodo;
    },
  },
};