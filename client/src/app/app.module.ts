import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskService } from './services/task.service';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent
    // Lisää muita komponentteja tänne tarpeen mukaan
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    // Lisää muita Angular-moduuleja tänne tarpeen mukaan
  ],
  providers: [
    TaskService
    // Lisää muita palveluita tänne tarpeen mukaan
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
