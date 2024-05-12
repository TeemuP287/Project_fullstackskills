import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskService } from './services/task.service';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent
    // Lisää muita komponentteja tänne tarpeen mukaan
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
