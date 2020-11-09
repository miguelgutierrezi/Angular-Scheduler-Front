import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../../../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass']
})
export class AddTaskComponent implements OnInit {

  @Input() message: string;
  @Output() closeAlert = new EventEmitter<void>();
  public onAddTask: FormGroup;

  constructor(
    private taskService: TasksService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.onAddTask = this.formBuilder.group({
      name: [null, Validators.compose([
        Validators.required
      ])],
      priority: [null, Validators.compose([
        Validators.required
      ])],
      date: [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  public onClose(): void {
    this.closeAlert.emit();
  }
}
