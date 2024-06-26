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
  tasks: Task[] = [];
  selectedTasks: Set<string> = new Set();
  hoveredTaskId: string | boolean | null = null;
  remainingCharacters: number = 120;
  currentPage: number = 1;
  tasksPerPage: number = 4;
  titleError: string | null = null;
  descriptionError: string | null = null;


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
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }


  // Sivutus --->

  paginatedTasks(): Task[] {
    const startIndex = (this.currentPage - 1) * this.tasksPerPage;
    return this.tasks.slice(startIndex, startIndex + this.tasksPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.tasks.length / this.tasksPerPage);
  }

  pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  // <--- Sivutus 

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
    if (this.selectedTasks.size === 0) {
      alert('Valitse poistettavat tehtävät');
    } else {
      const confirmDelete = confirm('Haluatko varmasti poistaa kaikki valitut tehtävät?');
      if (confirmDelete) {
        this.deleteSelectedTasks();
      }
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


  deleteAllTasksConfirmation(): void {
    const confirmDelete = confirm('Haluatko varmasti poistaa kaikki tehtävät?');
    if (confirmDelete) {
      this.deleteAllTasks();
    }
  }

  deleteAllTasks(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      tasks.forEach(task => {
        if (task._id) {
          this.deleteTask(task._id);
        }
      });
    });
  }

  showAddTaskForm(): void {
    if (this.activeTask && !this.activeTask._id) {
      this.isEditFormVisible = !this.isEditFormVisible;
    } else {
      this.isEditFormVisible = true;
      this.activeTask = Task.createDefaultTask();
    }
  }

  setActiveTask(task: Task): void {
    if (this.activeTask && this.activeTask._id === task._id && this.isEditFormVisible) {
      this.isEditFormVisible = false;
    } else {
      this.activeTask = { ...task };
      this.isEditFormVisible = true;
    }
  }

  hoverTask(taskId: string | boolean | null): void {
    this.hoveredTaskId = taskId;
  }

  addNewTask(): void {
    if (!this.validateForm()) {
      return;
    }
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
    if (!this.validateForm()) {
      return;
    }
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
    this.resetErrors();
  }

  updateRemainingCharacters(): void {
    this.remainingCharacters = 120 - (this.activeTask?.title?.length || 0);
  }


  validateForm(): boolean {
    let isValid = true;
    this.resetErrors();
  
    if (!this.activeTask?.title && !this.activeTask?.description) {
      this.titleError = 'Lisää otsikko';
      this.descriptionError = 'Lisää tehtävän kuvaus';
      isValid = false;
    } else {
      if (!this.activeTask?.title) {
        this.titleError = 'Lisää otsikko';
        isValid = false;
      }
      if (!this.activeTask?.description) {
        this.descriptionError = 'Lisää tehtävän kuvaus';
        isValid = false;
      }
    }
  
    return isValid;
  }
  

  resetErrors(): void {
    this.titleError = null;
    this.descriptionError = null;
  }


}
