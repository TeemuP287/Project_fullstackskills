// task-list.component.ts
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
  isEditFormVisible: boolean = false;
  activeTask: Task | null = null;
  tasks: Observable<Task[]> | undefined;
  selectedTasks: Set<string> = new Set();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  toggleTaskSelection(taskId: string): void {
    if (this.selectedTasks.has(taskId)) {
      this.selectedTasks.delete(taskId);
    } else {
      this.selectedTasks.add(taskId);
    }
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.getTasks();
    });
  }

  deleteSelectedTasks(): void {
    this.selectedTasks.forEach(taskId => {
      this.deleteTask(taskId);
    });
    this.selectedTasks.clear();
  }

  showAddTaskForm(): void {
    this.isEditFormVisible = true;
    this.activeTask = { _id: '', title: '', description: '', completed: false, day: '', reminder: false };
  }

  setActiveTask(task: Task): void {
    this.activeTask = task;
    this.isEditFormVisible = true;
  }

  addNewTask(): void {
    if (this.activeTask) {
      this.taskService.addTask(this.activeTask).subscribe(() => {
        this.getTasks();
        this.isEditFormVisible = false;
        this.activeTask = null;
      }, (error: any) => {
        console.error('Error adding new task:', error);
      });
    }
  }

  updateTask(): void {
    if (this.activeTask && this.activeTask._id) {
      this.taskService.updateTask(this.activeTask).subscribe(() => {
        this.getTasks();
        this.isEditFormVisible = false;
        this.activeTask = null;
      }, (error: any) => {
        console.error('Error updating task:', error);
      });
    }
  }

  cancelEdit(): void {
    this.isEditFormVisible = false;
    this.activeTask = null;
  }
}
