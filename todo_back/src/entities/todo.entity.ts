import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

// priority can be only from Minor to Critical level
export enum Priority {
  CRITICAL = 0,
  HIGH = 1,
  MEDIUM = 2,
  LOW = 3,
  MINOR = 4,
}

registerEnumType(Priority, {
  name: 'Priority',
});

@Entity()
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({
    default: Priority.LOW,
    enum: Priority,
    type: 'enum',
  })
  @Field((type) => Priority)
  priority: Priority;

  @Column('varchar', { length: 600 })
  @Field((type) => String)
  content: string;

  @Column({ default: false })
  @Field((type) => Boolean)
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  @Field((type) => Int)
  user: number;
}
