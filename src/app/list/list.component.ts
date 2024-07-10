import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Todo } from '../models/todo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  todos: any = [];
  chosenDate: string = '';
  
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const chosenDateParam = this.activatedRoute.snapshot.queryParamMap.get('chosenDate');
    if (chosenDateParam !== '' && chosenDateParam!==null) {
      this.chosenDate = chosenDateParam;
      this.loadTodos();
    }
  }

  loadTodos(): void {
    this.apiService
      .getTodos()
      .subscribe(
        (todos) =>
          (this.todos = todos.filter((task) => task.date === this.chosenDate))
      );
    this.apiService.todosLen = this.todos.length;
  }

  handleTodoDeleted(id: number): void {
    this.loadTodos();
  }

  dateChanged(event: any) {
    const chosenDate = event.value;
    const day = chosenDate.getDate();
    const month = chosenDate.getMonth() + 1;
    const year = chosenDate.getFullYear();

    this.chosenDate = `${day}.${month}.${year}`;
    this.loadTodos();
  }
}
