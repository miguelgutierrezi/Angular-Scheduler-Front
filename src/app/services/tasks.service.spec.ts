import {inject, TestBed} from '@angular/core/testing';

import {TasksService} from './tasks.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Task} from '../models/task';

describe('TasksService', () => {
  const task: Task = new Task();
  task.id = 'ID';
  task.name = 'NAME';
  task.priority = 5;
  task.date = new Date();
  task.userId = 'USERID';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService]
    });
  });

  it('service should be created', inject([TasksService], (service: TasksService) => {
    expect(service).toBeTruthy();
  }));

  it('service should send getTasks', inject([TasksService], (service: TasksService) => {
    service.getTasks();
    expect(service).toBeTruthy();
  }));

  it('service should send getTask', inject([TasksService], (service: TasksService) => {
    service.getTask(task.id);
    expect(service).toBeTruthy();
  }));

  it('service should send getTask and throw error', inject([TasksService], (service: TasksService) => {
    expect(() => service.getTask(undefined)).toThrowError();
    expect(service).toBeTruthy();
  }));

  it('service should send createTask', inject([TasksService], (service: TasksService) => {
    service.createTask(task);
    expect(service).toBeTruthy();
  }));

  it('service should send createTask and throw error', inject([TasksService], (service: TasksService) => {
    expect(() => service.createTask(undefined)).toThrowError();
    expect(service).toBeTruthy();
  }));

  it('service should send updateTask', inject([TasksService], (service: TasksService) => {
    service.updateTask(task);
    expect(service).toBeTruthy();
  }));

  it('service should send updateTask and throw error', inject([TasksService], (service: TasksService) => {
    expect(() => service.updateTask(undefined)).toThrowError();
    expect(service).toBeTruthy();
  }));

  it('service should send deleteTask', inject([TasksService], (service: TasksService) => {
    service.deleteTask(task.id);
    expect(service).toBeTruthy();
  }));

  it('service should send deleteTask and throw error', inject([TasksService], (service: TasksService) => {
    expect(() => service.deleteTask(undefined)).toThrowError();
    expect(service).toBeTruthy();
  }));

  it('service should send deleteTasks', inject([TasksService], (service: TasksService) => {
    service.deleteTasks();
    expect(service).toBeTruthy();
  }));
});
