// src/todo/todo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoStatus } from './models/todo.models';

@Injectable()
export class TodoService {
  // 今回はDBと接続しないのでメモリ上にTodoを保存します。
  private todoList: Todo[] = [
    {
      id: '1',
      title: 'test 1',
      description: 'description 1',
      status: TodoStatus.NEW,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'test 2',
      description: 'description 2',
      status: TodoStatus.IN_PROGRESS,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'test 3',
      description: 'description 3',
      status: TodoStatus.COMPLETE,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // 全件取得のメソッド
  findAll(): Todo[] {
    return this.todoList;
  }
  // idを元に一件取得のメソッド
  findOneById(id: string): Todo {
    const result = this.todoList.find((todo) => id === todo.id);
    if (!result) {
      // なかったら404エラーを返す。ビルトインのエラーも豊富にあってエラー処理も結構楽
      // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
      throw new NotFoundException();
    }
    return result;
  }
}
