import { priority } from '../priorityEnum';
export class Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date:string;
  priority:priority ;

  constructor(id: number, title: string, description: string, completed: boolean,date:string,priority:priority ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.date=date;
    this.priority=priority;
  }
}
