import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import {TasksService} from '../../../services/tasks.service';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let taskServiceSpy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ AddTaskComponent ],
      providers: [
        TasksService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    taskServiceSpy = TestBed.inject(TasksService);
    fixture.detectChanges();
  });

  it('should create', () => {
    component.onClose();
    expect(component).toBeTruthy();
  });

  it('should send onSubmit with invalid form', () => {
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it('should send onSubmit', () => {
    component.onAddTask.controls.name.setValue('Task name');
    component.onAddTask.controls.priority.setValue(5);
    component.onAddTask.controls.date.setValue('2020-01-01');
    spyOn(taskServiceSpy, 'createTask').and.returnValue(of({
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
