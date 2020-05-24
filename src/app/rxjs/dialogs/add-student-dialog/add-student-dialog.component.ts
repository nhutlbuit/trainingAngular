import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateAdapter, MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatDialogRef,
  MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatRippleModule, MatSelectModule,
  MatSnackBarModule, MatTooltipModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ScopeService } from '../../../service/scope.service';
import { RxjsService } from '../../service/rxjs.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
  },
};

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class AddStudentDialogComponent implements OnInit {

  addFromGroup: FormGroup;
  data: { [s: string]: string; } = {};
  classCodeList: [];
  maxDate: Date;

  constructor(public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFather: any,
    public rxjsService: RxjsService,
    private formBuilder: FormBuilder,
    public scopeService: ScopeService) {
    if (!this.dataFather.student.isAddNew) {
      this.initData(dataFather.student);
    }
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.fetchClassCodeList();
    this.initForm();
  }

  initForm() {
    this.addFromGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      studentCode: [''],
      classCode: [''],
      dateOfBirth: [''],
      phoneNumber: [''],
      address: ['']
    });
  }

  fetchClassCodeList() {
    this.rxjsService.fetchClassCodes().subscribe(res => {
      this.classCodeList = res['_embedded'].trainingClasses;
    });
  }

  initData(dt: any) {
    this.data['id'] = dt.id;
    this.data['classCode'] = dt.classCode;
    this.data['dateOfBirth'] = dt.dateOfBirth;
    this.data['firstName'] = dt.firstName;
    this.data['lastName'] = dt.lastName;
    this.data['middleName'] = dt.middleName;
    this.data['phoneNumber'] = dt.phoneNumber;
    this.data['studentCode'] = dt.studentCode;
    this.data['address'] = dt.address;
  }

  save() {
    if (this.dataFather.student.isAddNew) {
      this.rxjsService.createdStudent(this.data).subscribe(_ => {
        alert('Created student successfully');
      }, _ => this.handlerErr());
    } else {
      this.rxjsService.updatedStudent(this.data).subscribe(_ => {
        alert('Updated student successfully');
      }, _ => this.handlerErr());
    }
  }

  handlerErr() {
    alert('Updated has error. Please contact admin!');
  }

}

const modules = [
  CommonModule,
  FormsModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatRippleModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTooltipModule,
  ReactiveFormsModule,
  MatGridListModule
];

@NgModule({
  imports: [...modules],
  declarations: [AddStudentDialogComponent],
})
export class AddStudentModule {

}
