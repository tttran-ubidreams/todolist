import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Todo {
  id: ID!
  text: String!
  completed: Boolean
}

type Query {
  getTodos: [Todo]    
  getTodo(id: ID!): Todo
}

type Mutation {
  addTodo(text: String!): Todo 
  removeTodo(id: ID!): Todo
  toggleTodo(id: ID!): Todo
}

type Subscription {
  todoAdded: Todo
  todoToggled: Todo
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
