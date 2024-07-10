import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../models/todo';
import { ApiService } from '../api.service';
import { priority } from '../priorityEnum';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo: Todo = new Todo(0, '', '', false, '', priority.Low);
  @Output() todoChanged = new EventEmitter<number>();
  @Input() chosenDate: string = '';
  priorities = priority;
  constructor(private apiService: ApiService) {}

  toggleCompleted() {
    this.todo.completed = !this.todo.completed;
    this.apiService.updateTodo(this.todo).subscribe(
      (updatedTodo) => {
        console.log('Todo updated:', updatedTodo);
        this.todoChanged.emit(this.todo.id);

      },
      (error) => {
        console.error('Error updating todo:', error);
      }
    );
  }

  deleteTodo() {
    this.apiService.deleteTodo(this.todo.id).subscribe(
      () => {
        console.log('Todo deleted:', this.todo.id);
        this.todoChanged.emit(this.todo.id);
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }
}
