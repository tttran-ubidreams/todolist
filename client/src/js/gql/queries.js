import {gql} from 'react-apollo';

export const getTodosQuery = gql`{
    getTodos {
        id
        text
        completed
    }
}`;

export const onTodoAddedSubscription = gql`
    subscription {
        todoAdded {
            id
            text
            completed
        }
}`

export const onTodoToggledSubscription = gql`
    subscription {
        todoToggled {
            id
            text
            completed
        }
}`