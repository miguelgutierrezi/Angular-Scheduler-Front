import { Component, OnInit } from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {
  public isLoading = false;
  tasks: Array<Task> = [];
  private userId: string;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params.userId;
    });
  }

}
