import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import {
  MatDialog,
  MatPaginator,
  MatTableDataSource,
  MatDialogConfig
} from '@angular/material';
import { AddUserDialogComponent } from '../dialogs/add-user-dialog/add-user-dialog.component';
import { EventService } from '../../service/event.service';
import { tap } from 'rxjs/operators/tap';
import { EditUserDialogComponent } from '../dialogs/edit-user-dialog/edit-user-dialog.component';
import { ChangeStatusDialogComponent } from '../dialogs/change-status-dialog/change-status-dialog.component';
import { UIService } from '../../service/uiservice.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, AfterViewInit {
  displayedColumns = ['position', 'userName', 'fullName', 'status', 'action'];
  dataSource = new MatTableDataSource();
  userName: string;
  userStatus: number;
  loading = false;
  public sum: number;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  isAction: boolean;
  isTest = false;
  isTestBehaviorSubject: boolean;
  isTestEventEmiiter: boolean;

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private userService: UserService,
    private uiService: UIService
  ) {
    this.uiService.navBarEventSource.subscribe(a => {
      this.isAction = a;
    });
    this.uiService.isTestBehaviorSubject.subscribe(a => this.isTestBehaviorSubject = a);
    this.isTest = this.uiService.isTest;
    this.uiService.isTestEventEmiiter.subscribe(x => {
      this.isTestEventEmiiter = x;
    });
  }

  ngOnInit() {
    this.paginator.pageSize = 5;
    this.search();
    this.paginator.page
      .pipe(
        tap(() =>
          this.search(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.userName
          )
        )
      )
      .subscribe();

    this.eventService.closeDialogEventSource.subscribe(data => {
      const openDialog = this.dialog.getDialogById('createUser');
      if (openDialog) {
        if (data === 'createUser') {
          this.search(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.userName
          );
          openDialog.close();
        }
      }
    });
    this.eventService.closeDialogEventSource.subscribe(data => {
      const openDialog = this.dialog.getDialogById('updateUser');
      if (openDialog) {
        if (data === 'updateUser') {
          this.search(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.userName
          );
          openDialog.close();
        }
      }
    });
  }

  ngAfterViewInit() {}

  searchByUserName() {
    this.paginator.pageIndex = 0;
    this.search(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.userName
    );
  }

  clearSearchData() {
    this.paginator.pageIndex = 0;
    this.userName = undefined;
    this.search(this.paginator.pageIndex, this.paginator.pageSize);
  }

  search(page?: number, size?: number, userName?: string) {
    this.loading = true;
    if (page === undefined) {
      page = this.paginator.pageIndex;
    }
    if (size === undefined) {
      size = this.paginator.pageSize;
    }
    if (userName) {
      this.userService.findByUserName(page, size, userName).subscribe(res => {
        this.loading = false;
        this.displayData(res);
      });
    } else {
      this.userService.getAllUsers(page, size).subscribe(res => {
        this.loading = false;
        this.displayData(res);
      });
    }
  }

  displayData(data: any) {
    this.dataSource.data = data;
    this.paginator.length = 50;
    this.paginator.pageIndex = 0;
  }

  createAccount(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      title: 'Register new account'
    };
    dialogConfig.id = 'createUser';
    this.dialog.open(AddUserDialogComponent, dialogConfig);
  }

  editAccount(data: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '40%';
    dialogConfig.data = data;
    dialogConfig.id = 'updateUser';
    this.dialog.open(EditUserDialogComponent, dialogConfig);
  }

  changeStatus(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '25%';
    dialogConfig.id = 'changeStatus';
    const dialogRef = this.dialog.open(
      ChangeStatusDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (data.status === true) {
          data.status = false;
        } else {
          data.status = true;
        }
        this.userService
          .updateUser(data.id, { status: data.status })
          .subscribe(resp => {});
      }
    });
  }

  onChange(event, user) {
    if (event.checked === true) {
      user.status = 1;
      this.userStatus = 1;
    } else {
      user.status = 0;
      this.userStatus = 0;
    }
  }



}

