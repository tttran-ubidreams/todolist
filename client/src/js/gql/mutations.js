import {gql} from 'react-apollo';

export const addTodoMutation = gql`
    mutation addTodo($text: String!){
        addTodo(text: $text) {
            id
            text
        }
    }
`;