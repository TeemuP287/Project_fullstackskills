import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() delete: EventEmitter<string> = new EventEmitter();
  @Output() edit: EventEmitter<Task> = new EventEmitter();

  selectedTasks: Set<string> = new Set();

  toggleTaskSelection(taskId: string | null): void {
    if (taskId) { // Tämä tarkistaa, että taskId ei ole null tai undefined
      if (this.selectedTasks.has(taskId)) {
        this.selectedTasks.delete(taskId);
      } else {
        this.selectedTasks.add(taskId);
      }
    }
  }

  onDelete(taskId: string | null): void {
    if (taskId) { // Tämä tarkistaa, että taskId ei ole null tai undefined
      this.delete.emit(taskId);
    }
  }

  onEdit(task: Task): void {
    this.edit.emit(task);
  }
}