import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Priority } from 'src/entities/todo.entity';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsNotEmpty()
  content: string;

  @Field()
  @IsNotEmpty()
  user: number;

  @Field()
  @IsNotEmpty()
  priority: Priority;
}
