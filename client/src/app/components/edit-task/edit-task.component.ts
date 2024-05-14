/*import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  @Input() task!: Task; // Varmistetaan, että task on määritelty
  @Output() taskUpdated: EventEmitter<Task> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  constructor(private taskService: TaskService) {}

  saveTask(): void {
    if (this.task && this.task._id) { // Tarkistetaan, että task ja sen _id ovat määritelty
      this.taskService.updateTask(this.task).subscribe({
        next: (updatedTask) => {
          this.taskUpdated.emit(updatedTask); // Emit updated task
        },
        error: (err) => {
          console.error('Error updating task:', err);
        }
      });
    }
  }

  cancelEdit(): void {
    this.cancel.emit();
  }
}
**/