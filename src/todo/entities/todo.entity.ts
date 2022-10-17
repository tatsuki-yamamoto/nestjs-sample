import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TodoStatus {
  NEW,
  IN_PROGRESS,
  COMPLETE,
}

// enumを使用する際は registerEnumType でenumを登録しなくてはならない
// https://docs.nestjs.com/graphql/unions-and-enums#enums
registerEnumType(TodoStatus, {
  name: 'TodoStatus',
});

@Entity({ name: 'todos' })
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field({ nullable: false })
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field(() => TodoStatus)
  status: TodoStatus;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
