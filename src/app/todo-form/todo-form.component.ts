import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  newTodo: Todo = new Todo(0, '', '', false, '');
  chosenDate: string = '';
  constructor(
    private todoService: ApiService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.chosenDate = params['chosenDate'] || '';
    });
    this.newTodo.date =this.chosenDate;
  }

  addTodo(): void {
    if (this.newTodo.title.trim()) {
      this.todoService.addTodo(this.newTodo).subscribe((todo) => {
        this.newTodo = new Todo(0, '', '', false,'');
      });
      this.route.navigate(['/'],{ queryParams: { chosenDate: this.chosenDate } });
    }
  }
}
