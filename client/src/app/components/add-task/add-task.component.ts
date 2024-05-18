import { Component, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter();
  newTask: Task = Task.createDefaultTask(); // Käytetään staattista metodia
  activeTask: any;
  tasks: Task[] = [];
  isEditFormVisible: boolean | undefined;

  constructor(private taskService: TaskService) {}

  addTask(): void {
    if (this.newTask) {
      this.newTask.created_at = new Date(); // Asetetaan luontipäivämäärä
      this.newTask.updated_at = null; // Varmistetaan, että muokkauspäivämäärää ei ole asetettu
      this.taskService.addTask(this.newTask).subscribe((newTask: Task) => {
        this.tasks.push(newTask);
        this.isEditFormVisible = false;
        this.newTask = Task.createDefaultTask(); // Alustetaan uudelleen
        this.taskAdded.emit(newTask);
      }, (error: any) => {
        console.error('Virhe lisätessä uutta tehtävää:', error);
      });
    }
  }

  cancel(): void {
    this.isEditFormVisible = false;
    this.newTask = Task.createDefaultTask();
  }
}