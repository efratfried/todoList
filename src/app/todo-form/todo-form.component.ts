import { Component } from '@angular/core';
import {Todo} from '../models/todo'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  newTodo: Todo = new Todo(0,'','',true);

  constructor(private todoService: ApiService,private route:Router) {}

  addTodo(): void {
    if (this.newTodo.title.trim()) {
      this.todoService.addTodo(this.newTodo)
        .subscribe(todo => {
          this.newTodo = new Todo(0, '', '', false);
        });
        this.route.navigate(['/'])

    }
  }
}
