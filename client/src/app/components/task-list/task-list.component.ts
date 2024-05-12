import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
setActiveTask(_t4: Task) {
throw new Error('Method not implemented.');
}
editTask(_t4: Task) {
throw new Error('Method not implemented.');
}
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task._id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t._id !== task._id);
    });
  }

  toggleCompleted(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      // Päivitä tehtävien lista tässä, jos tarpeen
      this.tasks = this.tasks.map(t => t._id === task._id ? updatedTask : t);
    });
  }
}
