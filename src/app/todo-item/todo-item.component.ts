import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../models/todo';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo: Todo=new Todo(0,'','',false);
  @Output() todoDeleted = new EventEmitter<number>();

  constructor(private apiService: ApiService) {}

  toggleCompleted() {
    this.todo.completed = !this.todo.completed;
    this.apiService.updateTodo(this.todo).subscribe(
      updatedTodo => {
        console.log('Todo updated:', updatedTodo);
      },
      error => {
        console.error('Error updating todo:', error);
      }
    );
  }

  deleteTodo() {
    this.apiService.deleteTodo(this.todo.id).subscribe(
      () => {
        console.log('Todo deleted:', this.todo.id);
        this.todoDeleted.emit(this.todo.id);
      },
      error => {
        console.error('Error deleting todo:', error);
      }
    );
  }
}
