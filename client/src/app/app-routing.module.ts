// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Tuo tarvittavat komponentit, joita käytät reiteissä
import { TaskListComponent } from './components/task-list/task-list.component';
// Lisää muita komponentteja tarpeen mukaan

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  // Määrittele lisää reittejä tarpeen mukaan
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
