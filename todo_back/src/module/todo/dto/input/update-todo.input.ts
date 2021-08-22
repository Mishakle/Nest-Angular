import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Priority } from 'src/entities/todo.entity';

@InputType()
export class UpdateTodoInput {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsNotEmpty()
  user: number;

  @Field()
  @IsNotEmpty()
  priority: Priority;

  @Field()
  @IsNotEmpty()
  content: string;

  @Field()
  @IsNotEmpty()
  isCompleted: boolean;
}
