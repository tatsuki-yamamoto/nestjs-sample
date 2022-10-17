// src/todo/todo.service.ts
import { v4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Todo, TodoStatus } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  // 全件取得のメソッド
  async findTodos(): Promise<Todo[]> {
    const todos = await this.todoRepository.find({
      order: {
        createdAt: 'DESC',
      }, // ソート順
    });
    if (!todos) {
      throw new NotFoundException();
    }
    return todos;
  }

  // idを元に一件取得のメソッド
  async findTodoById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id: id });
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  // 新しいTodoを追加する。
  // ID等、自動的に設定できる項目は引数として受け取らないようにする。
  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo: Todo = {
      ...createTodoDto,
      id: v4(),
      status: TodoStatus.NEW,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.todoRepository.save(newTodo);
    return newTodo;
  }

  async updateStatus(updateStatusDto: UpdateStatusDto): Promise<Todo> {
    const targetTodo = await this.todoRepository.findOneBy({
      id: updateStatusDto.id,
    });
    if (!targetTodo) {
      throw new NotFoundException();
    }
    const newTodo = {
      ...targetTodo,
      status: updateStatusDto.status,
      updatedAt: new Date(),
    };
    await this.todoRepository.save(newTodo);
    return newTodo;
  }

  async deleteTodo({ id }: DeleteTodoDto): Promise<Todo> {
    const targetTodo = await this.todoRepository.findOneBy({ id: id });
    if (!targetTodo) {
      throw new NotFoundException();
    }
    const responseTodo = { ...targetTodo };
    await this.todoRepository.remove(targetTodo);
    return responseTodo;
  }
}
