import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit {

  @Input() message: string;
  @Output() closeAlert = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public onClose(): void {
    this.closeAlert.emit();
  }
}
