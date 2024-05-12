import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Tuo HttpClient tähän
import { Task } from '../models/Task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks'; // Backend-palvelimen osoite

  constructor(private http: HttpClient) { }

  getTasks(): any {
    return this.http.get(this.apiUrl);
  }

  deleteTask(id: string): any {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTask(task: Task): any {
    return this.http.put(`${this.apiUrl}/${task._id}`, task);
  }
}
