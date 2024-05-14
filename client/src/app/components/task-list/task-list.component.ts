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
  editClickCount: number = 0; // Lisätty laskuri tuplaklikkausta varten

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
    // Tarkistetaan, onko muokkausnappia painettu kahdesti
    if (this.activeTask && this.activeTask._id === task._id) {
      this.editClickCount++;
      if (this.editClickCount === 2) {
        this.cancelEdit();
        this.editClickCount = 0; // Nollataan laskuri
      }
    } else {
      this.editClickCount = 1; // Aloitetaan laskenta uudelle tehtävälle
      this.activeTask = task;
      this.isEditFormVisible = true;
    }
    // Asetetaan laskuri nollaan jos ei ole tuplaklikattu ajoissa.
    setTimeout(() => this.editClickCount = 0, 100);
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
