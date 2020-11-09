import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TasksService} from '../../../services/tasks.service';
import {Task} from '../../../models/task';

@Component({
  selector: 'app-tasks-reminder',
  templateUrl: './tasks-reminder.component.html',
  styleUrls: ['./tasks-reminder.component.sass']
})
export class TasksReminderComponent implements OnInit {

  constructor(
    private taskService: TasksService
  ) { }

  public currentDate: Date = new Date();
  public tasksAboutEnd: Array<string> = [];
  @Output() closeAlert = new EventEmitter<void>();

  private static compareDates(d1: Date, d2: Date): boolean {
    return (d1.getDate() === d2.getDate())
      && (d1.getMonth() === d2.getMonth())
      && (d1.getFullYear() === d2.getFullYear());
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      for (const task of tasks) {
        const newTask = new Task();
        newTask.date = new Date(task.date);
        if (TasksReminderComponent.compareDates(this.currentDate, newTask.date)) {
          this.tasksAboutEnd.push(task.name);
        }
      }
    });
  }

  public onClose(): void {
    this.closeAlert.emit();
  }

}
