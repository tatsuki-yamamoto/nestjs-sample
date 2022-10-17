// src/todo/todo.resolver.ts
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoDto } from './dto/create-todo.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Todo } from './entities/todo.entity';
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
  async findTodos(): Promise<Todo[]> {
    return await this.todoService.findTodos().catch((err) => {
      throw err;
    });
  }

  @Query(() => Todo)
  // Queryに引数がある場合はArgsデコレータで定義。
  // 第一引数に引数の名前、第二引数に型を指定。
  async findTodoById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Todo> {
    return await this.todoService.findTodoById(id).catch((err) => {
      throw err;
    });
  }

  // MutationデコレータでMutationを定義
  // https://docs.nestjs.com/graphql/mutations

  @Mutation(() => Todo)
  async createTodo(@Args('todo') todo: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(todo).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => Todo)
  async updateStatus(@Args('todo') todo: UpdateStatusDto): Promise<Todo> {
    return this.todoService.updateStatus(todo).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => Todo)
  async deleteTodo(@Args('todo') todo: DeleteTodoDto): Promise<Todo> {
    return this.todoService.deleteTodo(todo).catch((err) => {
      throw err;
    });
  }
}
