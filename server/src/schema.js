import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Todo {
  id: ID!
  text: String!
  done: Boolean
}

type Query {
  getTodos: [Todo]    
  getTodo(id: ID!): Todo
}

type Mutation {
  addTodo(text: String!): Todo 
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
