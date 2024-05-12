import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Observable<Task[]> | undefined;
  selectedTasks: Set<string> = new Set();
  activeTask: Task | null = null;
  isEditFormVisible: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  setActiveTask(task: Task | null): void {
    this.activeTask = task;
    this.isEditFormVisible = !!task;
  }

  toggleTaskSelection(taskId: string): void {
    if (this.selectedTasks.has(taskId)) {
      this.selectedTasks.delete(taskId);
    } else {
      this.selectedTasks.add(taskId);
    }
  }

  deleteSelectedTasks(): void {
    this.selectedTasks.forEach(taskId => {
      this.deleteTask(taskId);
    });
    this.selectedTasks.clear();
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.getTasks();
    }, (error: any) => {
      console.error('Error deleting task:', error);
    });
  }

  addTask(): void {
    // Alustetaan uusi tehtävä, varmista että _id on tyypiltään 'string | null'
    this.activeTask = { title: '', description: '', _id: null, completed: false };
    this.isEditFormVisible = true;
  }

  saveTask(): void {
    if (this.activeTask) {
      if (this.activeTask._id) {
        this.taskService.updateTask(this.activeTask).subscribe(() => {
          this.getTasks();
          this.isEditFormVisible = false;
          this.activeTask = null;
        }, (error: any) => {
          console.error('Error updating task:', error);
        });
      } else {
        this.taskService.addTask(this.activeTask).subscribe((newTask: Task) => {
          this.getTasks();
          this.isEditFormVisible = false;
          this.activeTask = null;
        }, (error: any) => {
          console.error('Error adding new task:', error);
        });
      }
    }
  }

  cancelEdit(): void {
    this.activeTask = null;
    this.isEditFormVisible = false;
  }
}
