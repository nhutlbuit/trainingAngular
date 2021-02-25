import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { UserDto } from '../../../model/user-dto';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfo } from '../../../model/user-info';
import { User } from '../../../model/user';
import { RoleService } from '../../../service/role.service';
import { UserService } from '../../../service/user.service';
import { VN_DATE_PROVIDER } from '../../../util/date-format';
import { Role } from '../../../model/role';
import { EventService } from '../../../service/event.service';
import { Constants } from '../../../shared/constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
  providers: VN_DATE_PROVIDER
})
export class EditUserDialogComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  userDto = new UserDto();
  roles = [];
  authenModes = [
    { value: 0, viewValue: 'DB' },
    { value: 1, viewValue: 'LDAP' }
  ];
  curAuthMode;
  dob: Date;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private userService: UserService,
    private eventService: EventService
  ) {
  }

  ngOnInit() {
    // init roles list
    this.initRoleList();
    // get assigned roles
   // this.getAssignedRoles();
    // load user data
    // this.userDto.user = new User();
    // if (this.data.userInfo !== null) {
    //   this.userDto.userInfo = this.data;
    // } else {
    //   this.userDto.userInfo = new UserInfo();
    // }
    // this.dob = new Date(this.data.dob);
    this.form = this.formBuilder.group({
      roles: [],
      authenMode: [],
      userInfo: new FormGroup({
        firstName: new FormControl(this.data.firstName),
        lastName: new FormControl(this.data.lastName),
        dob: new FormControl(new Date(this.data.dob)),
        address: new FormControl(this.data.address)
      })
    });
  }

  ngAfterViewInit() {}

  initRoleList() {
    this.roles = [];
    this.roleService.findAll().subscribe(data => {
      this.roles = data;
    });
  }

  getAssignedRoles() {
    this.userDto.roles = [];
    this.userService
      .getAssignedRoles(
        this.data._links.assignedUserRoles.href + Constants.ASSIGNED_ROLE_PATH
      )
      .subscribe(assignedRoles => {
        if (assignedRoles) {
          assignedRoles._embedded.slAssignedUserRoles.forEach(element => {
            if (element.isActive === 1) {
              this.userDto.roles.push(element.userRole);
            }
          });
        }
        this.form
          .get('roles')
          .setValue(JSON.parse(JSON.stringify(this.userDto.roles)));
      });
  }

  compareRole(role1: Role, role2: Role) {
    return role1 && role2 ? role1.id === role2.id : role1 === role2;
  }

  submit() {
    const responses: Observable<any>[] = [];
    let responseData1;
    let responseData2;
    let responseData3;
    if (
      this.userDto.userInfo.firstName !== this.form.value.userInfo.firstName ||
      this.userDto.userInfo.lastName !== this.form.value.userInfo.lastName ||
      this.userDto.userInfo.dob !== this.form.value.userInfo.dob ||
      this.userDto.userInfo.address !== this.form.value.userInfo.address
    ) {
      let userInfo: UserInfo;
      userInfo = this.form.value.userInfo;
      userInfo.id = undefined;
      userInfo.fullName =
        this.form.value.userInfo.lastName +
        ' ' +
        this.form.value.userInfo.firstName;
      userInfo.refUserId = this.data.id;
      if (this.data.userInfo === null) {
        responseData1 = this.userService.createUserInfo(userInfo);
      } else {
        responseData1 = this.userService.updateUserInfo(
          this.data.userInfo.id,
          userInfo
        );
      }
      responses.push(responseData1);
      console.log(responses);
    }
    if (
      this.userDto.roles.length !== this.form.get('roles').value.length ||
      this.userDto.roles.filter(this.comparer(this.form.get('roles').value))
        .length > 0
    ) {
      responseData2 = this.userService.updateAssignedRoles(
        this.data.id,
        this.form.get('roles').value
      );
      responses.push(responseData2);
    }
    if (this.data.authenMode !== this.form.get('authenMode').value) {
      responseData3 = this.userService.updateUser(this.data.id, {
        authenMode: this.form.get('authenMode').value
      });
      responses.push(responseData3);
    }
    Observable.forkJoin(responses).subscribe(responseList => {
      this.eventService.closeDialogEventSource.emit('updateUser');
    });
  }

  close() {
    this.dialogRef.close();
  }

  comparer(otherArray) {
    return function(current) {
      return (
        otherArray.filter(function(other) {
          return (
            other.id === current.id &&
            other.roleName === current.roleName &&
            other.description === current.description &&
            other.isActive === current.isActive
          );
        }).length === 0
      );
    };
  }
}
