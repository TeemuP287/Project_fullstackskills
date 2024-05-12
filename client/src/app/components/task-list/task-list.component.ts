import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    if (task && this.activeTask && this.activeTask._id === task._id) {
      this.isEditFormVisible = !this.isEditFormVisible;
      this.activeTask = this.isEditFormVisible ? task : null;
    } else {
      this.activeTask = task;
      this.isEditFormVisible = !!task;
    }
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
      if (this.tasks) {
        this.tasks = this.tasks.pipe(
          map((tasks: Task[]) => tasks.filter((t: Task) => t._id !== taskId))
        );
      }
    }, (error: any) => {
      console.error('Error deleting task:', error);
    });
  }

  addTask(): void {
    if (this.activeTask) {
      this.taskService.addTask(this.activeTask).subscribe((newTask: Task) => {
        if (this.tasks) {
          this.tasks = this.tasks.pipe(
            map((tasks: Task[]) => [...tasks, newTask])
          );
        }
        this.isEditFormVisible = false;
        this.activeTask = null;
      }, (error: any) => {
        console.error('Error adding new task:', error);
      });
    }
  }

  saveTask(): void {
    if (this.activeTask) {
      if (this.activeTask._id) {
        this.taskService.updateTask(this.activeTask).subscribe((updatedTask: Task) => {
          if (this.tasks) {
            this.tasks = this.tasks.pipe(
              map((tasks: Task[]) => tasks.map((t: Task) => t._id === updatedTask._id ? updatedTask : t))
            );
          }
          this.isEditFormVisible = false;
          this.activeTask = null;
        }, (error: any) => {
          console.error('Error updating task:', error);
        });
      } else {
        this.taskService.addTask(this.activeTask).subscribe((newTask: Task) => {
          if (this.tasks) {
            this.tasks = this.tasks.pipe(
              map((tasks: Task[]) => [...tasks, newTask])
            );
          }
          this.isEditFormVisible = false;
          this.activeTask = null;
        }, (error: any) => {
          console.error('Error adding new task:', error);
        });
      }
    }
  }
}
