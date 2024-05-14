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
  newTask: Task = { _id: null, title: '', description: '', completed: false, day: '', reminder: false };
  activeTask: any;
  tasks: any;
  isEditFormVisible: boolean | undefined;

  constructor(private taskService: TaskService) {}

  addTask(): void {
    if (this.activeTask) {
      this.taskService.addTask(this.activeTask).subscribe((newTask: Task) => {
        this.tasks.push(newTask);
        this.isEditFormVisible = false;
        this.activeTask = null;
      }, (error: any) => {
        console.error('Virhe lisätessä uutta tehtävää:', error);
      });
    }
  }
}
