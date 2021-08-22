import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GetTodoArgs } from './dto/args/get-todo.args';
import { CreateTodoInput } from './dto/input/create-todo.input';
import { DeleteTodoInput } from './dto/input/delete-todo.input';
import { UpdateTodoInput } from './dto/input/update-todo.input';
import { Todo } from '../../entities/todo.entity';
import { TodoService } from './todo.service';

@Resolver(() => Todo)
@UseGuards(GqlAuthGuard)
export class TodoResolver {
  constructor(private readonly _todoService: TodoService) {}

  // get all user's Todos, array can be nullable
  @Query(() => [Todo], { name: 'todos', nullable: 'items' })
  getTodos(@Context() context): any {
    return this._todoService.findAllTodos(context.req.user.id);
  }

  // get one user's Todo
  @Query(() => Todo, { name: 'todo', nullable: true })
  getTodo(@Args() getTodoArgs: GetTodoArgs): any {
    return this._todoService.findOneTodo(getTodoArgs);
  }

  // create a Todo
  @Mutation(() => Todo)
  async createTodo(
    @Args('createTodoData') createTodoData: CreateTodoInput,
    @Context() context,
  ): Promise<Todo> {
    return this._todoService.createTodo(createTodoData, context.req.user.id);
  }

  // update a Todo
  @Mutation(() => Todo)
  updateTodo(
    @Args('updateTodoData') updateTodoData: UpdateTodoInput,
  ): Promise<Todo> {
    return this._todoService.updateTodo(updateTodoData);
  }

  // delete a Todo
  @Mutation(() => Todo)
  deleteTodo(@Args('deleteTodoData') deleteTodoData: DeleteTodoInput): any {
    return this._todoService.deleteTodo(deleteTodoData);
  }
}
