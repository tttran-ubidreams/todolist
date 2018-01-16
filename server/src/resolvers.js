import {PubSub, withFilter} from 'graphql-subscriptions';

let todos = [
  {
    id: 1,
    text: 'todo 1',
    completed: true
  },
  {
    id: 2,
    text: 'todo 2',
    completed: false
  }
];


function getTodo(id) {
  return todos.find(todo => todo.id === id);
}

const pubsub = new PubSub();

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
      let maxId = todos.reduce((prev, current) => (prev.id > current.id) ? prev.id : current.id, 0);
      const newTodo = {id: ++maxId, text: args.text, completed: false};
      todos.push(newTodo);
      pubsub.publish('todoAdded', {todoAdded: newTodo});
      return newTodo;
    },
    removeTodo: (root, args) => {
      let todoToRemove = todos.find(item => item.id == args.id);
      todos = todos.filter(item => item != todoToRemove);
      return todoToRemove;
    },
    toggleTodo: (root, args) => {
      let newItem = {};
      todos = todos.map(item => {
        if (item.id == args.id) {
          newItem = {
            ...item,
            completed: !item.completed
          };

          return newItem;
        }

        return item;
      });

      pubsub.publish('todoToggled', {todoToggled: newItem});

      return newItem;
    },
  },
  Subscription: {
    todoAdded: {
      subscribe: () => pubsub.asyncIterator('todoAdded')
    },
    todoToggled: {
      subscribe: () => pubsub.asyncIterator('todoToggled')
    }
  }
};