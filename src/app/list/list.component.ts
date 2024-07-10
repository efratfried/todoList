import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  todos: any = [];
  chosenDate: string = '';
  dialogOpen = false;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const chosenDateParam =
      this.activatedRoute.snapshot.queryParamMap.get('chosenDate');
    // if (chosenDateParam !== '' && chosenDateParam !== null) {
    //   this.chosenDate = chosenDateParam;
      this.loadTodos();
    // }
  }

  loadTodos(): void {
    this.apiService.getTodos().subscribe((todos) => {
      if (this.chosenDate != '') {
        this.todos = todos.filter(
          (task) =>
            task.date === this.chosenDate ||
            (task.priority === 'high' &&
              task.completed === false &&
              task.date <= this.chosenDate)
        );        
      }

      if (this.todos.some((task: any) => task.date !== this.chosenDate)||this.todos.some((task: any) => task.date !== this.getCurrentDateFormatted())) {
        this.openOlderTasksDialog();
      } 
    });

    this.apiService.todosLen = this.todos.length;
  }

  openOlderTasksDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
    });
  }

  handleTodo(id: number): void {
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

  getCurrentDateFormatted(): string {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
  
    return `${day}.${month}.${year}`;
  }
}
