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
  originalTask: Task | null = null;
  tasks: Observable<Task[]> | undefined;
  selectedTasks: Set<string> = new Set();
  hoveredTaskId: string | null = null;

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
        this.isEditFormVisible = true;
      }
    });
  }

  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  toggleTaskSelection(taskId: string | null): void {
    if (taskId && this.selectedTasks.has(taskId)) {
      this.selectedTasks.delete(taskId);
    } else if (taskId) {
      this.selectedTasks.add(taskId);
    }
  }

  deleteTaskConfirmation(task: Task): void {
    const confirmDelete = confirm(`Haluatko varmasti poistaa tehtävän "${task.title}"?`);
    if (confirmDelete && task._id) {
      this.deleteTask(task._id);
    }
  }

  deleteSelectedTasksConfirmation(): void {
    const confirmDelete = confirm('Haluatko varmasti poistaa kaikki valitut tehtävät?');
    if (confirmDelete) {
      this.deleteSelectedTasks();
    }
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.getTasks();
    });
  }

  deleteSelectedTasks(): void {
    this.selectedTasks.forEach(taskId => {
      if (taskId) {
        this.deleteTask(taskId);
      }
    });
    this.selectedTasks.clear();
  }

  showAddTaskForm(): void {
    this.isEditFormVisible = true;
    this.activeTask = Task.createDefaultTask();
  }

  setActiveTask(task: Task): void {
    if (task) {
      this.editClickSubject.next({ task });
    }
  }

  hoverTask(taskId: string | null): void {
    this.hoveredTaskId = taskId;
  }

  addNewTask(): void {
    if (this.activeTask) {
      this.activeTask.created_at = new Date();
      this.activeTask.updated_at = null;
      this.taskService.addTask(this.activeTask).subscribe(() => {
        this.getTasks();
        this.isEditFormVisible = false;
        this.activeTask = null;
        this.originalTask = null;
      }, (error: any) => {
        console.error('Virhe lisättäessä uutta tehtävää:', error);
      });
    }
  }

  updateTask(): void {
    if (this.activeTask && this.activeTask._id) {
      const isTaskModified = this.activeTask.title !== this.originalTask?.title ||
                             this.activeTask.description !== this.originalTask?.description ||
                             this.activeTask.completed !== this.originalTask?.completed;
      
      if (isTaskModified) {
        this.activeTask.updated_at = new Date();
      } else {
        this.activeTask.updated_at = null;
      }
      
      this.taskService.updateTask(this.activeTask).subscribe(() => {
        this.getTasks();
        this.isEditFormVisible = false;
        this.activeTask = null;
        this.originalTask = null;
      }, (error: any) => {
        console.error('Virhe päivitettäessä tehtävää:', error);
      });
    }
  }

  cancelEdit(): void {
    if (this.originalTask) {
      this.activeTask = { ...this.originalTask };
    }
    this.isEditFormVisible = false;
  }
}
