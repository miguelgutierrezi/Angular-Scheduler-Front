import {Component, OnInit} from '@angular/core';
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
  public tasks: Array<Task> = [];
  private userId: string;
  public addComponent = false;
  public editComponent = false;
  public reminderComponent = false;
  public error = null;
  public selectedTask: Task = null;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params.userId;
      this.isLoading = true;
      this.getTasks();
    });
    this.reminderComponent = true;
  }

  private getTasks(): void {
    this.tasks = [];
    this.selectedTask = null;
    this.tasksService.getTasks().subscribe((tasks) => {
      for (const task of tasks) {
        const newTask = new Task();
        newTask.id = task._id;
        newTask.priority = task.priority;
        newTask.name = task.name;
        newTask.date = task.date;
        newTask.userId = task.userId;
        this.tasks.push(newTask);
      }
      this.isLoading = false;
      if (this.tasks.length !== 0) {
        this.selectedTask = this.tasks[0];
      }
    }, (err) => {
      this.error = err.error.message;
      console.log(err);
    });
  }

  public loadAddComponent(): void {
    this.addComponent = true;
  }

  public closeAddComponent(): void {
    this.addComponent = false;
    this.isLoading = true;
    this.getTasks();
  }

  public loadEditComponent(): void {
    this.editComponent = true;
  }

  public closeEditComponent(): void {
    this.editComponent = false;
    this.isLoading = true;
    this.getTasks();
  }

  public closeError(): void {
    this.error = null;
    this.isLoading = true;
    this.getTasks();
  }

  public closeReminder(): void {
    this.reminderComponent = false;
  }

  public setTask(task: Task): void {
    this.selectedTask = task;
  }

  public deleteTask(): void {
    this.isLoading = true;
    this.tasksService.deleteTask(this.selectedTask.id).subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.getTasks();
    }, err => {
      console.log(err);
      this.isLoading = false;
      this.error = err.error.message;
    });
  }

  public deleteAllTasks(): void {
    this.isLoading = true;
    this.tasksService.deleteTasks().subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.getTasks();
    }, err => {
      console.log(err);
      this.isLoading = false;
      this.error = err.error.message;
    });
  }
}
