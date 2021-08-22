import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

import { Todo } from 'src/entities/todo.entity';
import { CreateTodoInput } from './dto/input/create-todo.input';
import { UpdateTodoInput } from './dto/input/update-todo.input';
import { DeleteTodoInput } from './dto/input/delete-todo.input';
import { GetTodoArgs } from './dto/args/get-todo.args';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  // Find all Todos of the authenticated user
  async findAllTodos(userId: number): Promise<any> {
    return await this.todoRepository.find({
      where: { user: userId },
    });
  }

  // find one Todo by todoID
  async findOneTodo(getTodoArgs: GetTodoArgs): Promise<Todo> {
    return await this.todoRepository.findOne(getTodoArgs);
  }

  // create a Todo
  async createTodo(
    createTodoData: CreateTodoInput,
    userId: number,
  ): Promise<Todo> {
    console.log('CREATEDATA', createTodoData);
    return await this.todoRepository.save({ ...createTodoData, user: userId });
  }

  // update a Todo
  async updateTodo(updateTodoData: UpdateTodoInput): Promise<Todo> {
    return await this.todoRepository.save(updateTodoData);
  }

  // delete a Todo by ID using Typeorm query
  async deleteTodo(deleteTodoData: DeleteTodoInput): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Todo)
      .where('id = :id', { id: deleteTodoData.id })
      .execute();
  }
}
