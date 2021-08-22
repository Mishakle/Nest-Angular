import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Todo } from 'src/entities/todo.entity';
import { AuthModule } from '../auth/auth.module';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), AuthModule],
  providers: [TodoService, TodoResolver],
  exports: [TypeOrmModule.forFeature([Todo]), TodoService],
})
export class TodoModule {}
