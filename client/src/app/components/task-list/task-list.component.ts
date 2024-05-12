import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  activeTask: Task | null = null;
  isEditFormVisible: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  setActiveTask(task: Task): void {
    // Jos muokkauslomake on jo auki samalle tehtävälle, sulje se
    if (this.activeTask && this.activeTask._id === task._id) {
      this.isEditFormVisible = !this.isEditFormVisible;
    } else {
      this.activeTask = task;
      this.isEditFormVisible = true;
    }
  }

  editTask(): void {
    if (this.activeTask) {
      this.taskService.updateTask(this.activeTask).subscribe((updatedTask: Task) => {
        this.tasks = this.tasks.map(t => t._id === updatedTask._id ? updatedTask : t);
        this.isEditFormVisible = false;
        this.activeTask = null; // Reset active task after editing
      }, (error: any) => {
        console.error('Virhe päivittäessä tehtävän tilaa:', error);
      });
    }
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task._id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t._id !== task._id);
    }, (error: any) => {
      if (error.status === 404) {
        console.error('Tehtävää ei löydy:', error.error);
      } else if (error.status === 500) {
        console.error('Palvelinvirhe:', error.error);
      } else {
        console.error('Virhe poistettaessa tehtävää:', error);
      }
    });
  }

  toggleCompleted(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.tasks = this.tasks.map(t => t._id === task._id ? updatedTask : t);
    }, (error: any) => {
      console.error('Virhe päivittäessä tehtävän tilaa:', error);
    });
  }
}
