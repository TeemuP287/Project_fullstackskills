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
  activeTask: Task | null = null; // Lisätty aktiivisen tehtävän tallentamiseen

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
    this.activeTask = task; // Asettaa aktiivisen tehtävän
  }

  editTask(task: Task): void {
    // Tässä voisi avata muokkauslomakkeen tai päivittää tehtävän suoraan
    // Esimerkiksi:
    // this.openEditForm(task);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task._id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t._id !== task._id);
    }, (error: any) => {
      console.error('Virhe poistettaessa tehtävää:', error);
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

  // Lisää tarvittavat metodit ja logiikka täällä
  // Esimerkiksi:
  // openEditForm(task: Task): void {
  //   // Avaa muokkauslomakkeen logiikka
  // }
}
