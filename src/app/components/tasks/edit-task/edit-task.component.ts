import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../../../services/tasks.service';
import {Task} from '../../../models/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.sass']
})
export class EditTaskComponent implements OnInit {

  @Input() task: Task;
  @Output() closeAlert = new EventEmitter<void>();
  public onEditTask: FormGroup;

  constructor(
    private taskService: TasksService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.onEditTask = this.formBuilder.group({
      name: [this.task.name, Validators.compose([
        Validators.required
      ])],
      priority: [this.task.priority, Validators.compose([
        Validators.required
      ])],
      date: [this.task.date, Validators.compose([
        Validators.required
      ])]
    });
    console.log(this.onEditTask.value);
  }

  public onClose(): void {
    this.closeAlert.emit();
  }

  public onSubmit(): void {
    if (this.onEditTask.invalid) {
      return;
    }
    const newTask: Task = new Task();
    const date = new Date(this.onEditTask.get('date').value);
    date.setDate(date.getDate() + 1);
    newTask.id = this.task.id;
    newTask.name = this.onEditTask.get('name').value;
    newTask.priority = +this.onEditTask.get('priority').value;
    newTask.date = date;
    newTask.userId = localStorage.getItem('userId');

    this.taskService.updateTask(newTask).subscribe((res) => {
      console.log(res);
      this.closeAlert.emit();
    });
  }
}
