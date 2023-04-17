import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class TodoService {
  constructor(
    @Inject('FirebaseAdmin') private readonly _firebaseAdmin: admin.app.App,
  ) {}

  async getAllTodos() {
    const todos = [];
    const snapshot = await this._firebaseAdmin
      .firestore()
      .collection('todos')
      .get();
    snapshot.forEach((doc) => {
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
    const ref = await this._firebaseAdmin
      .firestore()
      .collection('todos')
      .add(todo);
    return { id: ref.id, ...todo };
  }

  async updateTodoById(id: string, todo: any) {
    await this._firebaseAdmin
      .firestore()
      .collection('todos')
      .doc(id)
      .update(todo);
    return { id, ...todo };
  }

  async deleteTodoById(id: string) {
    await this._firebaseAdmin.firestore().collection('todos').doc(id).delete();
    return { id };
  }
}
