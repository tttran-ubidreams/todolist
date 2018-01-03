import {gql} from 'react-apollo';

export const getTodosQuery = gql`{
    getTodos {
        id
        text
    }
}`;