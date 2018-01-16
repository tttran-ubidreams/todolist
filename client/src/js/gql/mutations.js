import {gql} from 'react-apollo';

export const addTodoMutation = gql`
    mutation addTodo($text: String!){
        addTodo(text: $text) {
            id
            text
            completed
        }
    }
`;

export const removeTodoMutation = gql`
    mutation removeTodo($id: ID!){
        removeTodo(id: $id) {
            id
            text
        }
    }
`;

export const toggleTodoMutation = gql`
    mutation toggleTodo($id: ID!){
        toggleTodo(id: $id) {
            id
            text
            completed
        }
    }
`;