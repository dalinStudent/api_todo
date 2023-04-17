import { Module } from '@nestjs/common';
import { TodoController } from '../controllers/todo.controller';
import adminProvider from '../config/firebase.config';
import { TodoService } from 'src/services/todo.service';
@Module({
  controllers: [TodoController],
  providers: [adminProvider, TodoService],
})
export class TodoModule {}
