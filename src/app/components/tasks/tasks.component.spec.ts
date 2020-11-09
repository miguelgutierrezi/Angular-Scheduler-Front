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

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let taskServiceSpy;

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
    expect(component).toBeTruthy();
  });
});
