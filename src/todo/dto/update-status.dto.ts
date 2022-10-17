import { Field, ID, InputType } from '@nestjs/graphql';
import { TodoStatus } from '../entities/todo.entity';

@InputType()
export class UpdateStatusDto {
  @Field((type) => ID)
  id: string;

  @Field((type) => TodoStatus)
  status: TodoStatus;
}
