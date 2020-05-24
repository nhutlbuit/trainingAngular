import { ScopeService } from './../../service/scope.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  MatTableDataSource, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,
  MatPaginator, MatDialog, MatSnackBar, MatSort
} from '@angular/material';
import { DialogModel } from '../dialogs/dialog-model/dialog-model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.css']
})
export class ScopeComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource;
  displayedColumns = ['id', 'scopeValue', 'actions'];
  /////////////////////////////////////
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  /////////////////////////////////////

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dialogContainer: DialogModel; // dialog

  isAddNew = false;

  scopeValue = new FormControl('', [Validators.required]);

  constructor(public scopeService: ScopeService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getErrorMessage() {
    return this.scopeValue.hasError('required') ? 'You must enter a value' : '';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition
    });
  }

  public loadData() {
    this.scopeService.findAllScopes().subscribe(
      data => {
        let scopes = [];
        scopes = data._embedded.slScopes.sort((n1, n2) => {
          if (n1.id > n2.id) {
            return 1;
          }
          if (n1.id < n2.id) {
            return -1;
          }
          return 0;
        });
        // this.dataSource.data = appInfoList.filter(appInfo => appInfo.isActive !== 0);
        this.dataSource.data = scopes;

      }
    );
  }

  addNew() {
    // console.log('add new');
    this.isAddNew = true;
    this.dataSource.data = [...this.dataSource.data,
    {
      scopeValue: '',
      isEditable: true
    }
    ];
    // console.log(this.paginator.length);
    this.paginator.length += 1;
   // this.paginator.lastPage();

  }

  cancelAction(row) {
    // this.loadData();
    // console.log('cancel: ', row);
    // console.log(this.paginator.length);
    row.isEditable = !row.isEditable;
    if (this.isAddNew === true) {
      this.dataSource.data = this.dataSource.data.slice(0, this.dataSource.data.length - 1);
      this.isAddNew = !this.isAddNew;
    }
    this.loadData();
  }

  saveData(scope: any) {

    // console.log('saveData', scope);
    if (this.isAddNew === true) {
      // Save new data
      this.scopeService.addScope(scope).subscribe(response => {
        this.isAddNew = !this.isAddNew;
        scope.isEditable = !scope.isEditable;
        this.openSnackBar('Successfully', 'Create');
        // console.log('Add New: ', response);
        this.loadData();
      }, error => {
        console.log('save data: ', error);
        this.openSnackBar(error.statusText, 'Create');
      });
    } else {
      // Save update data
      this.scopeService.updateScope(scope.id, scope.scopeValue).subscribe(response => {
        scope.isEditable = !scope.isEditable;
        this.openSnackBar('Successfully', 'Update');
        // console.log('update: ', response);
      }, error => {
        console.log('save data: ', error);
        this.openSnackBar(error.statusText, 'Update');
      });
    }
  }

  deleteScope(id: number) {

    // this.dialogContainer = new DialogModel();
    // this.dialogContainer.title = 'Confirm Delete Scope';
    // this.dialogContainer.content = 'Are you sure to delete?';
    // const dialogRef = this.dialog.open(DialogConfirmComponent, {
    //   height: '200px',
    //   width: '420px',
    //   data: { bundle: this.dialogContainer }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.scopeService.deleteScope(id).subscribe(response => {
    //       this.openSnackBar('Successfully', 'Delete');
    //       this.loadData();
    //     }, error => {
    //       this.openSnackBar(error.statusText, 'Delete');
    //     });
    //   } else {
    //     this.loadData();
    //   }
    // }, error => {
    //   console.log(error);
    // });
  }

}
