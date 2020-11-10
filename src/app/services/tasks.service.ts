import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly BASE_URL = environment.backUrl;
  private readonly userId = localStorage.getItem('userId');

  constructor(
    private http: HttpClient
  ) {
  }

  public getTasks(): Observable<any> {
    const body = {
      date: localStorage.getItem('date')
    };
    return this.http.post(`${this.BASE_URL}/tasks/${this.userId}`, body);
  }

  public getTask(taskId: string): Observable<any> {
    if (!taskId) {
      throw new Error('TaskID is required');
    }
    const body = {
      date: localStorage.getItem('date')
    };
    return this.http.post(`${this.BASE_URL}/tasks/get/${this.userId}/${taskId}`, body);
  }

  public createTask(task: Task): Observable<any> {
    if (!task) {
      throw new Error('Task is required');
    }
    const newTask = {
      name: task.name,
      priority: task.priority,
      dateTask: task.date,
      date: localStorage.getItem('date')
    };
    return this.http.post(`${this.BASE_URL}/tasks/create/${this.userId}`, newTask);
  }

  public updateTask(newTask: Task): Observable<any> {
    if (!newTask) {
      throw new Error('Updated task is required');
    }
    const updatedTask = {
      name: newTask.name,
      priority: newTask.priority,
      dateTask: newTask.date,
      date: localStorage.getItem('date')
    };
    return this.http.put(`${this.BASE_URL}/tasks/${this.userId}/${newTask.id}`, updatedTask);
  }

  public deleteTask(taskId: string): Observable<any> {
    if (!taskId) {
      throw new Error('TaskID is required');
    }
    const body = {
      date: localStorage.getItem('date')
    };
    return this.http.put(`${this.BASE_URL}/tasks/delete/${this.userId}/${taskId}`, body);
  }

  public deleteTasks(): Observable<any> {
    const body = {
      date: localStorage.getItem('date')
    };
    return this.http.put(`${this.BASE_URL}/tasks/${this.userId}`, body);
  }
}
