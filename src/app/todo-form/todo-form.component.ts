import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { priority } from '../priorityEnum';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  newTodo: Todo = new Todo(0, '', '', false, '',priority.High);
  chosenDate: string = '';
  priority:string=priority.High;
  priorityList:any=[];
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
    this.priorityList = Object.values(priority).filter(value => typeof value === 'string');    
  }

  addTodo(): void {
    if (this.newTodo.title.trim()) {
      this.todoService.addTodo(this.newTodo).subscribe((todo) => {
        this.newTodo = new Todo(0, '', '', false,'',priority.Low);
      });
      this.route.navigate(['/'],{ queryParams: { chosenDate: this.chosenDate } });
    }
  }

  prioritySelected(event:any)
  {
    this.newTodo.priority=event.value
  }
}
