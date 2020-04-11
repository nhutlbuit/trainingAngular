import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../service/role.service';
import { Role } from '../../../model/role';
import { UserDto } from '../../../model/user-dto';
import { User } from '../../../model/user';
import { UserInfo } from '../../../model/user-info';
import { VN_DATE_PROVIDER } from '../../../util/date-format';
import { EventService } from '../../../service/event.service';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { PasswordValidator } from '../../../util/password-validator';
import {
  ConfirmValidParentMatcher,
  errorMessages
} from '../../../util/confirm-validator';
import {map, catchError} from 'rxjs/operators';
import { from } from 'rxjs/internal/observable/from';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css'],
  providers: VN_DATE_PROVIDER
})
export class AddUserDialogComponent implements OnInit {
  userDto = new UserDto();
  roles = [];
  hide: any;
  authenModes = [
    { value: 0, viewValue: 'DB' },
    { value: 1, viewValue: 'LDAP' }
  ];
  minDate: Date;
  maxDate: Date;
  form: FormGroup;
  passwordFormGroup: FormGroup;
public sum: number;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private roleService: RoleService,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.userDto.userInfo = new UserInfo();
    this.userDto.user = new User();
    this.userDto.roles = [];
  }

  ngOnInit() {
    this.passwordFormGroup = this.formBuilder.group(
      {
        password: ['', Validators.required],
        repeatPassword: ['', Validators.required]
      },
      { validator: PasswordValidator.validate.bind(this) }
    );
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      passwordFormGroup: this.passwordFormGroup,
      roles: ['', Validators.required],
      authenMode: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      dob: [''],
      testDate: [''],
      address: ['']
    });
    this.roleService.findAll().subscribe(data => {
      this.roles = [];
      data.forEach(element => {
        if (element.isActive) {
           this.roles.push(element);
        }
      });
    //  const source = from([data]);
    //  this.roles.push(source.pipe(map(e => {
    //    if (e.isAtive) {
    //      return e;
    //     }})));
    });
    this.minDate = new Date('11/28/2018');
    this.maxDate = new Date('11/30/2018');
  }

  submit() {
    this.userDto.user.id = undefined;
    this.userDto.user.status = 1;
    this.userDto.user.wrongAttempt = 0;
    this.userDto.userInfo.id = undefined;
    this.userDto.userInfo.fullName =
      this.userDto.userInfo.lastName + ' ' + this.userDto.userInfo.firstName;
    this.userDto.roles.forEach(role => {
      role._links = undefined;
      role.id = undefined;
    });
    this.userService.createUser(this.userDto).subscribe(() => {
      this.eventService.closeDialogEventSource.emit('createUser');
    });
    // this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
  caculate() {
    let start = 1;
    const end = 3;
    this.sum = 1;
   for (start; start <= end; start++) {
     this.sum = this.sum * start;
   }
   alert(this.sum);
 }

  comparePassword() { }
}
