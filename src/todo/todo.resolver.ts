// src/todo/todo.resolver.ts
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoDto } from './dto/create-todo.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Todo } from './models/todo.models';
import { TodoService } from './todo.service';

// Resolverデコレータでresolverを定義
// https://docs.nestjs.com/graphql/resolvers#code-first-resolver
@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}
  // QueryデコレータでQueryを定義
  // 第一引数にReturnTypeFuncを指定し、型を定義。ここではTodoの配列を指定。
  // 第二引数にオプションとして{ nullable: 'items' }を与えることでから配列を許容する。[Todo]!と同義。
  // デフォルトでは [Todo!]! になる。
  @Query(() => [Todo], { nullable: 'items' })
  findTodoList() {
    return this.todoService.findTodoList();
  }

  @Query(() => Todo)
  // Queryに引数がある場合はArgsデコレータで定義。
  // 第一引数に引数の名前、第二引数に型を指定。
  // schema上の型定義は findTodoById(id: ID!): Todo! となる
  findTodoById(@Args('id', { type: () => ID }) id: string) {
    return this.todoService.findTodoById(id);
  }

  // MutationデコレータでMutationを定義
  // https://docs.nestjs.com/graphql/mutations
  @Mutation(() => Todo)
  createTodo(@Args('todo') todo: CreateTodoDto): Todo {
    return this.todoService.createTodo(todo);
  }

  @Mutation(() => Todo)
  updateStatus(@Args('todo') todo: UpdateStatusDto): Todo {
    return this.todoService.updateStatus(todo);
  }

  @Mutation(() => Todo)
  deleteTodo(@Args('todo') todo: DeleteTodoDto): Todo {
    return this.todoService.deleteTodo(todo);
  }
}
