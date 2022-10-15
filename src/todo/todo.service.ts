// src/todo/todo.service.ts
import { v4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoStatus } from './models/todo.models';
import { CreateTodoDto } from './dto/create-todo.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

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
  findTodoList(): Todo[] {
    return this.todoList;
  }

  // idを元に一件取得のメソッド
  findTodoById(id: string): Todo {
    const result = this.todoList.find((todo) => id === todo.id);
    if (!result) {
      // なかったら404エラーを返す。ビルトインのエラーも豊富にあってエラー処理も結構楽
      // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
      throw new NotFoundException();
    }
    return result;
  }

  // 新しいTodoを追加する。
  // ID等、自動的に設定できる項目は引数として受け取らないようにする。
  createTodo(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      ...createTodoDto,
      id: v4(),
      status: TodoStatus.NEW,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.todoList.push(newTodo);
    return newTodo;
  }

  updateStatus(updateStatusDto: UpdateStatusDto): Todo {
    const targetTodo = this.todoList.find(
      (todo) => todo.id === updateStatusDto.id,
    );
    if (!targetTodo) {
      throw new NotFoundException();
    }
    const newTodo = {
      ...targetTodo,
      status: updateStatusDto.status,
      updatedAt: new Date(),
    };
    this.todoList = this.todoList.map((todo) =>
      todo.id === newTodo.id ? newTodo : todo,
    );
    return newTodo;
  }

  deleteTodo({ id }: DeleteTodoDto): Todo {
    const targetTodo = this.todoList.find((todo) => todo.id === id);
    if (!targetTodo) {
      throw new NotFoundException();
    }
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
    return targetTodo;
  }
}
