import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

const routes: Routes = [
  {path:'',component:ListComponent},
  { path: 'add-task', component: TodoFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
