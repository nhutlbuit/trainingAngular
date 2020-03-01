import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { AppInfo } from '../../model/app-info';
import { ClientAppService } from '../../service/client-app.service';
import { AddClientDialogComponent } from '../dialogs/add-client-dialog/add-client-dialog.component';
import { DialogConfirmComponent } from '../dialogs/confirm-dialog/dialog-confirm.component';
import { DialogModel } from '../dialogs/dialog-model/dialog-model';
import { EditClientDialogComponent } from '../dialogs/edit-client-dialog/edit-client-dialog.component';

@Component({
  selector: 'app-client-app',
  templateUrl: './client-app.component.html',
  styleUrls: ['./client-app.component.css']
})
export class ClientAppComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource;
  displayedColumns = ['id', 'clientSecrets', 'clientName',
    'redirectUrl', 'resourceIds', 'grantTypes', 'scopes', 'actions', 'active'];
  checked = true;
  appIsActives: any = [];
  /////////////////////////////////////
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  /////////////////////////////////////

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dialogContainer: DialogModel; // dialog

  constructor(public clientAppService: ClientAppService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clientAppService.changeEventHandle$
      .subscribe(data => {
        if (data === 'delete') {
          this.loadData();
        }
      });
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition
    });
  }

  confirmDisable(id: any, isActive: number): void {
    this.clientAppService.deleteClientApp(id, isActive).subscribe(response => {
      this.openSnackBar('Successful', isActive === 1 ? 'Disable ' : 'Enable');
      this.loadData();
    }, error => {
      console.log(error);
    });
  }

  deleteDialog(item: any) {
    this.dialogContainer = new DialogModel();
    this.dialogContainer.title = item.isActive === 1 ? 'Confirm Disable App' : 'Confirm Enable App';
    this.dialogContainer.content = item.isActive === 1 ? 'Are you sure to disable?' : 'Are you sure to enable?';
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      height: '200px',
      width: '420px',
      data: { bundle: this.dialogContainer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmDisable(item.id, item.isActive);
      } else {
        this.loadData();
      }
    }, error => {
      console.log(error);
    });
  }

  addNew(appInfo: AppInfo) {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      data: {
        appInfo: appInfo,
      },
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  startEdit(i: number, appInfo: AppInfo) {
    const dialogRef = this.dialog.open(EditClientDialogComponent, {
      data: appInfo,
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  public loadData() {
    this.clientAppService.findAllClientApps().subscribe(
      data => {
        const appInfoList = data._embedded.appInfoes;
        this.dataSource.data = appInfoList;

        if (this.dataSource.data.length !== 0) {
          this.dataSource.data.forEach((item) => {
            if (item.hasOwnProperty('_embedded') && item['_embedded'].hasOwnProperty) {
              if (item['_embedded'].assignedAppInfoScopes.length !== 0) {
                const scopeList = [];
                item['_embedded'].assignedAppInfoScopes.forEach(element => {
                  if (element.isActive === 1) {
                    scopeList.push({
                      id: element.scope.id,
                      scopeValue: element.scope.scopeValue
                    });
                  }
                });
                item['scopes'] = scopeList;
              }
            }
          });
        }
      }
    );
  }

}

