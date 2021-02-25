import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModel } from '../dialog-model/dialog-model';

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

