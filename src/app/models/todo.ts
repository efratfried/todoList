export class Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date:string;

  constructor(id: number, title: string, description: string, completed: boolean,date:string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.date=date;
  }
}
