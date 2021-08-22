import { Injectable } from '@angular/core';
import { resultKeyNameFromField } from '@apollo/client/utilities';
import { Apollo, gql, Subscription } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { Todo } from '../interfaces';

const GET_TODOS = gql`
  query {
    todos {
      id
      content
      priority
      isCompleted
    }
  }
`;

const CREATE_TODO = gql`
  mutation ($content: String!) {
    createTodo(createTodoData: { content: $content, user: 1, priority: 1 }) {
      content
      user
      priority
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class TodosService {
  constructor(private apollo: Apollo) {}

  getAllTodos() {
    return this.apollo
      .watchQuery<{ todos: Todo[] }>({
        query: GET_TODOS,
      })
      .valueChanges.pipe(map((result) => result.data.todos));
  }

  createTodo(content: string) {
    return this.apollo.mutate({
      mutation: CREATE_TODO,
      variables: {
        content,
      },
    });
  }
}
