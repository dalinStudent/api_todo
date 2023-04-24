import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';

@Controller('api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string) {
    return this.todoService.getTodoById(id);
  }

  @Post()
  async createTodo(@Body() todo: any) {
    return this.todoService.createTodo(todo);
  }

  @Put(':id')
  async updateTodoById(@Param('id') id: string, @Body() todo: any) {
    return this.todoService.updateTodoById(id, todo);
  }

  @Delete(':id')
  async deleteTodoById(@Param('id') id: string) {
    return this.todoService.deleteTodoById(id);
  }
}
