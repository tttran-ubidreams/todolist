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
  addTodo(text: String): Todo 
}
`;