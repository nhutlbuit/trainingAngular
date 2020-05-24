import { MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit, AfterViewInit, Inject, Input, NgModule } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatButtonModule } from '@angular/material';
import { DialogModel } from '../dialog-model/dialog-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})

export class DialogConfirmComponent {

  dialog: DialogModel;
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogContainer: any) {
      this.dialog = dialogContainer.bundle;
  }

}

@NgModule({
  imports: [ CommonModule, MatButtonModule, MatDialogModule],
  declarations: [DialogConfirmComponent],
})
export class DialogConfirmModule {

}

