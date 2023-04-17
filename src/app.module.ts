import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo.module';
import { TodoController } from './controllers/todo.controller';
import adminProvider from './config/firebase.config';
import { TodoService } from './services/todo.service';

@Module({
  imports: [TodoModule],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService, adminProvider],
})
export class AppModule {}
