import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksReminderComponent } from './tasks-reminder.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TasksService} from '../../../services/tasks.service';
import {of} from 'rxjs';

describe('TasksReminderComponent', () => {
  let component: TasksReminderComponent;
  let fixture: ComponentFixture<TasksReminderComponent>;
  let tasksServiceSpy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ TasksReminderComponent ],
      providers: [ TasksService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksReminderComponent);
    component = fixture.componentInstance;
    tasksServiceSpy = TestBed.inject(TasksService);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(tasksServiceSpy, 'getTasks').and.returnValue(of([{
      name: 'Task1',
      _id: 'taskId',
      priority: 5,
      userId: 'userId',
      date: new Date(),
      _v: '0'
    }]));
    component.onClose();
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
