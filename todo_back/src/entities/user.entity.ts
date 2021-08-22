import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './todo.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => String)
  username: string;

  @Column({ unique: true })
  @Field((type) => String)
  email: string;

  @Column()
  @Field((type) => String)
  password: string;

  // one to many relationship
  @OneToMany(() => Todo, (todo) => todo.user)
  @Field((type) => [Todo]!)
  todos: Todo[];
}
