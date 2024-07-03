import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  @Output() taskAdded = new EventEmitter<string>();
  newTask: string = '';

  addTask() {
    if (this.newTask.trim()) {
      this.taskAdded.emit(this.newTask);
      this.newTask = '';
    }
  }
}
