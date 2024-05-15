import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
  originalTask: Task | null = null; // Alkuperäisen muokattavan tehtävän tila
  tasks: Observable<Task[]> | undefined;
  selectedTasks: Set<string> = new Set();

  private editClickSubject = new Subject<{ task: Task }>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();

    this.editClickSubject.pipe(debounceTime(150)).subscribe(({ task }) => {
      if (this.activeTask && this.activeTask._id === task._id && this.isEditFormVisible) {
        this.isEditFormVisible = false;
      } else {
        
        if (!this.activeTask || this.activeTask._id !== task._id) {
          this.originalTask = { ...task };
          this.activeTask = { ...task }; 
        }
        this.isEditFormVisible = true; // Avaa lomake
      }
    });
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
    this.editClickSubject.next({ task }); // Lähetä klikkaustapahtuma 
  }

  addNewTask(): void {
    if (this.activeTask) {
      this.taskService.addTask(this.activeTask).subscribe(() => {
        this.getTasks();
        this.isEditFormVisible = false;
        this.activeTask = null;
        this.originalTask = null; // Tyhjennä originalTask tallennuksen jälkeen
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
        this.originalTask = null; // Tyhjennä originalTask tallennuksen jälkeen
      }, (error: any) => {
        console.error('Error updating task:', error);
      });
    }
  }

  cancelEdit(): void {
    if (this.originalTask) {
      this.activeTask = { ...this.originalTask }; // Palauta alkuperäinen tehtävä
    }
    this.isEditFormVisible = false;
  }
}