import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../service/event.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-change-status-dialog',
  templateUrl: './change-status-dialog.component.html',
  styleUrls: ['./change-status-dialog.component.css']
})
export class ChangeStatusDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ChangeStatusDialogComponent>,
    private eventService: EventService
  ) {}

  ngOnInit() {}

  confirm() {
    this.eventService.closeDialogEventSource.emit('statusChanged');
    this.dialogRef.close(true);
  }

  cancel() {
    this.eventService.closeDialogEventSource.emit('statusNotChanged');
    this.dialogRef.close(false);
  }
}
