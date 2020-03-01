import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import { EventService } from '../../service/event.service';
import { RoleService } from '../../service/role.service';
import { tap } from 'rxjs/operators/tap';
import { ChangeStatusDialogComponent } from '../dialogs/change-status-dialog/change-status-dialog.component';

@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.css']
})
export class RoleDashboardComponent implements OnInit {
  displayedColumns = ['position', 'name', 'description', 'status', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  roleName: string;
  roleStatus: number;

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.paginator.pageSize = 5;
    this.search();
    this.paginator.page
      .pipe(tap(() => this.search(this.paginator.pageIndex)))
      .subscribe();
  }

  search(page?: number, size?: number, roleName?: string) {
    if (page === undefined) {
      page = this.paginator.pageIndex;
    }
    if (size === undefined) {
      size = this.paginator.pageSize;
    }
    if (roleName) {
      this.roleService
        .getByRoleName(roleName)
        .subscribe(res => this.displayData(res));
    } else {
      this.roleService
        .getAll(page, size)
        .subscribe(res => this.displayData(res));
    }
  }

  displayData(data: any) {
    this.dataSource.data = data._embedded.slRoles;
    this.paginator.length = data.page.totalElements;
    this.paginator.pageIndex = data.page.number;
  }

  searchByRoleName() {
    this.search(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.roleName
    );
  }

  onChange(event, role) {
    if (event.checked === true) {
      role.status = 1;
      this.roleStatus = 1;
      console.log(1);
    } else {
      role.status = 0;
      this.roleStatus = 0;
      console.log(0);
    }
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
        if (data.isActive === 1) {
          data.isActive = 0;
        } else {
          data.isActive = 1;
        }
        this.roleService
          .updateRole(data.id, { isActive: data.isActive })
          .subscribe(resp => {});
      }
    });
  }
}
