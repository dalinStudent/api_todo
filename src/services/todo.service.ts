import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class TodoService {
  constructor(
    @Inject('FirebaseAdmin') private readonly _firebaseAdmin: admin.app.App,
  ) {}

  async getAllTodos() {
    const todos = [];
    const todoQuery = await this._firebaseAdmin
      .firestore()
      .collection('todos')
      .get();
    todoQuery.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() });
    });
    return todos;
  }

  async getTodoById(id: string) {
    const todo = await this._firebaseAdmin
      .firestore()
      .collection('todos')
      .doc(id)
      .get();
    return { id: todo.id, ...todo.data() };
  }

  async createTodo(todo: any) {
    const now = new Date();
    const formattedTime = now.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
    const data = { ...todo, createdDt: formattedTime };

    const createTodo = await this._firebaseAdmin
      .firestore()
      .collection('todos')
      .where('todo', '==', data.todo)
      .get();

    if (!createTodo.empty) {
      return {
        message: 'error',
        data: 'A todo with the same name already exists.',
      };
    }

    const ref = await this._firebaseAdmin
      .firestore()
      .collection('todos')
      .add(data);

    const createdTodo = { id: ref.id, ...data };
    return { message: 'success', data: createdTodo };
  }

  async updateTodoById(id: string, todo: any) {
    const { todo: updatedTodo } = todo;

    const todoUpdate = await this._firebaseAdmin
      .firestore()
      .collection('todos')
      .where('todo', '==', updatedTodo)
      .get();
    const docs = todoUpdate.docs.filter((doc) => doc.id !== id);
    if (docs.length > 0) {
      throw new Error('Todo already exists');
    }

    const now = new Date();
    const formattedTime = now.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
    const todoWithTime = { ...todo, createdDt: formattedTime };

    await this._firebaseAdmin
      .firestore()
      .collection('todos')
      .doc(id)
      .update(todoWithTime);
    const updated = { id, ...todoWithTime };
    return { message: 'success', data: updated };
  }

  async deleteTodoById(id: string) {
    await this._firebaseAdmin.firestore().collection('todos').doc(id).delete();
    return { id };
  }
}
