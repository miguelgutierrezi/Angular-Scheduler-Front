import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TasksService} from '../../services/tasks.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AuthGuard} from '../../services/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../services/auth.interceptor';
import {Task} from '../../models/task';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let taskServiceSpy;

  const task: Task = new Task();
  task.id = 'ID';
  task.name = 'NAME';
  task.priority = 5;
  task.date = new Date();
  task.userId = 'USERID';

  // taskServiceSpy = jasmine.createSpyObj('TasksService', [ 'getTasks' ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ TasksComponent ],
      providers: [
        TasksService,
        {provide: ActivatedRoute, useValue: {params: of({userId: 'userId'})}},
        AuthGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    taskServiceSpy = TestBed.inject(TasksService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    spyOn(taskServiceSpy, 'getTasks').and.returnValue(of([{
      name: 'Task1',
      _id: 'taskId',
      priority: 5,
      userId: 'userId',
      date: new Date(),
      _v: '0'
    }]));
    component.ngOnInit();
    component.loadAddComponent();
    component.loadEditComponent();
    component.closeEditComponent();
    component.closeAddComponent();
    component.closeError();
    component.closeReminder();
    component.setTask(task);
    expect(component).toBeTruthy();
  });

  it('should send delete task', () => {
    component.selectedTask = task;
    spyOn(taskServiceSpy, 'deleteTask').and.returnValue(of([{
      message: 'Deleted element'
    }]));
    component.deleteTask();
    expect(component).toBeTruthy();
  });

  it('should send delete all tasks', () => {
    spyOn(taskServiceSpy, 'deleteTasks').and.returnValue(of([{
      message: 'Deleted tasks'
    }]));
    component.deleteAllTasks();
    expect(component).toBeTruthy();
  });
});
