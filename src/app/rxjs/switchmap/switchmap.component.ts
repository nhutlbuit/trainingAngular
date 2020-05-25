import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgModule, ViewChild } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap } from 'rxjs/operators';
import { DialogModel } from '../../uicomp/dialogs/dialog-model/dialog-model';
import { Student } from '../model/student';
import { RxjsService } from '../service/rxjs.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-switchmap',
  templateUrl: './switchmap.component.html',
  styleUrls: ['./switchmap.component.css']
})
export class SwitchmapComponent implements AfterViewInit {

  searchField: FormControl;
  searchUserName$ = new BehaviorSubject('');
  dataSource: any;
  filteredData: any;
  searchByName = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['studentCode', 'name', 'class', 'dob', 'phone', 'address', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addStudentInstance: any;
  deleteStudentInstance: any;

  constructor(public rxjsService: RxjsService, public dialog: MatDialog, public snackBar: MatSnackBar) {

  }

  ngAfterViewInit() {
    this.initData();
  }

  initData() {
    this.searchAutocomplete();
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.paginate();
    this.paginator.page.pipe(tap(() => this.paginate())).subscribe();
  }

  searchAutocomplete() {
    this.rxjsService.filterUserNames(this.searchUserName$).subscribe(res => {
      this.filteredData = res._embedded.students;
    });
  }

  resetFilter() {
    this.searchByName = '';
    this.paginate();
  }

  paginate() {
    this.rxjsService.findByUserNameContaining(this.searchByName, this.paginator.pageIndex, this.paginator.pageSize).subscribe(res => {
      this.dataSource = res['_embedded'].students;
      this.paginator.length = res['page'].totalElements;
      this.paginator.pageIndex = res['page'].number;
    });
  }

  async addNewOrUpdate(row?: any) {
    let st = new Object();
    if (row) {
      st = new Student(row);
      st['isAddNew'] = false;
    } else {
      st['isAddNew'] = true;
    }

    if (!this.addStudentInstance) {
      this.addStudentInstance = await import('../dialogs/add-student-dialog/add-student-dialog.component');
    }
    const dialogRef = this.dialog.open(this.addStudentInstance.AddStudentDialogComponent, {
      data: {
        student: st,
      },
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paginate();
      }
    });
  }

  async deleteDialog(item: any) {
    if (!this.deleteStudentInstance) {
      this.deleteStudentInstance = await import('../../uicomp/dialogs/confirm-dialog/dialog-confirm.component');
    }

    const dialogContainer = new DialogModel();
    dialogContainer.title = 'Confirm Message';
    dialogContainer.content = `Are you sure delete student <b>${item.fullName}</b>?`;
    const dialogRef = this.dialog.open(this.deleteStudentInstance.DialogConfirmComponent, {
      height: '200px',
      width: '420px',
      data: { bundle: dialogContainer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rxjsService.deleteStudent(item).subscribe(_ => {
          this.openSnackBar(`Deleted student ${item.fullName} successfully`, '');
          this.paginate();
          this.searchUserName$.next('');
        }, _ => alert('Deleted the student has error. Please contact admin!'));
      }
    }, error => {
      console.log(error);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition
    });
  }

}

const modules = [
  CommonModule,
  MatButtonModule,
  MatPaginatorModule,
  MatTableModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  FormsModule
];
@NgModule({
  imports: [
    ...modules,
    RouterModule.forChild([
      {
        path: '',
        component: SwitchmapComponent
      }
    ])
  ],
//  exports: [...modules],
  declarations: [SwitchmapComponent]
})
export class SwitchMapModule {}

