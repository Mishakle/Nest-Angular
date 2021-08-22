import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteTodoInput {
  @Field()
  @IsNotEmpty()
  id: number;
}
