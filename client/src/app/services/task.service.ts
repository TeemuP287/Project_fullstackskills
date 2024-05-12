import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  getTasks(): any {
    return this.http.get('/tasks');
  }

  deleteTask(id: string): any {
    return this.http.delete(`/tasks/${id}`);
  }

  updateTask(task: Task): any {
    return this.http.put(`/tasks/${task._id}`, task);
  }
}