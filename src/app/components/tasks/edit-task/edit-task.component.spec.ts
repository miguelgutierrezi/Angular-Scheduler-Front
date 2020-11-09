import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskComponent } from './edit-task.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TasksService} from '../../../services/tasks.service';
import {of} from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';
import {Task} from '../../../models/task';

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;
  let taskServiceSpy;
  const task: Task = new Task();
  task.id = 'ID';
  task.name = 'NAME';
  task.priority = 5;
  task.date = new Date();
  task.userId = 'USERID';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ EditTaskComponent ],
      providers: [
        TasksService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    taskServiceSpy = TestBed.inject(TasksService);
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.onClose();
    expect(component).toBeTruthy();
  });

  it('should send onSubmit with invalid form', () => {
    component.onEditTask.controls.name.setValue(null);
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it('should send onSubmit', () => {
    component.onEditTask.controls.name.setValue('Task name');
    component.onEditTask.controls.priority.setValue(5);
    component.onEditTask.controls.date.setValue('2020-01-01');
    spyOn(taskServiceSpy, 'updateTask').and.returnValue(of({
      _id: 'id',
      name: 'Name',
      email: 'test@test.com',
      password: 'Pass123',
      _v: '0'
    }));
    component.onSubmit();
    expect(component).toBeTruthy();
  });
});
