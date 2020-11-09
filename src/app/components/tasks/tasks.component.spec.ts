import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TasksService} from '../../services/tasks.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let taskServiceSpy;

  taskServiceSpy = jasmine.createSpyObj('TasksService', [ 'getTasks' ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ TasksComponent ],
      providers: [
        {provide: TasksService, useValue: taskServiceSpy},
        {
          provide: ActivatedRoute,
          useValue: {params: of({userId: 'userId'})}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
