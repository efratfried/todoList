import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { todo } from '../list.json';
import { Router } from '@angular/router';
const ELEMENT_DATA: any[] = [{ todo: 1, name: 'ppp' }];
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  todos = todo;

  constructor(private apiService: ApiService,private route:Router) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.apiService.getTodos().subscribe((todos) => (this.todos = todos));
    this.apiService.todosLen = this.todos.length;
  }

  deleteTodo(id: number): void {
    this.apiService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    });
    this.loadTodos()
  }

}
