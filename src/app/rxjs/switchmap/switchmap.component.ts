import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatPaginator, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { FormControl } from '@angular/forms';
import { AddStudentDialogComponent } from '../dialogs/add-student-dialog/add-student-dialog.component';
import { Student } from '../model/student';
import { RxjsService } from '../service/rxjs.service';
import { DialogModel } from '../../uicomp/dialogs/dialog-model/dialog-model';
import { DialogConfirmComponent } from '../../uicomp/dialogs/confirm-dialog/dialog-confirm.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-switchmap',
  templateUrl: './switchmap.component.html',
  styleUrls: ['./switchmap.component.css'],
  providers: [ RxjsService]
})
export class SwitchmapComponent implements OnInit, AfterViewInit {

  searchField: FormControl;
  searchUserName$ = new BehaviorSubject('');
  dataSource: any;
  filteredData: any;
  searchByName = '';
  @ViewChild(MatPaginator, { read: false, static: true }) paginator: MatPaginator;
  displayedColumns = ['studentCode', 'name', 'class', 'dob', 'phone', 'address', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public rxjsService: RxjsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.search();
    this.getData();
  }

  ngAfterViewInit() {
  }

  search() {
    this.rxjsService.filterUserNames(this.searchUserName$).subscribe(res => {
      this.filteredData = res._embedded.students;
    });
  }

  viewName(dt: any): string {
    return dt.lastName + ' ' + dt.middleName + ' ' + dt.firstName;
  }

  resetFilter() {
    this.searchByName = '';
    this.getData();
  }

  getData() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.paginer();
  }

  paginer() {
    this.rxjsService.findByUserNameContaining(this.searchByName, this.paginator.pageIndex, this.paginator.pageSize).subscribe(res => {
      this.dataSource = res['_embedded'].students;
      this.paginator.length = res['page'].totalElements;
      this.paginator.pageIndex = res['page'].number;
    });
  }

  addNewOrUpdate(row?: any) {
    let st = new Object();
    if (row) {
      st = new Student(row);
      st['isAddNew'] = false;
    } else {
      st['isAddNew'] = true;
    }

    const dialogRef = this.dialog.open(AddStudentDialogComponent, {
      data: {
        student: st,
      },
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paginer();
      }
    });
  }

  deleteDialog(item: any) {
    const dialogContainer = new DialogModel();
    dialogContainer.title = 'Confirm Message';
    dialogContainer.content = `Are you sure delete student ${item.fullName}?`;
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      height: '200px',
      width: '420px',
      data: { bundle: dialogContainer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rxjsService.deleteStudent(item).subscribe(_ => {
          this.openSnackBar(`Deleted student ${item.fullName} successfully`, '');
          this.paginer();
          this.searchUserName$.next('');
        }, _ => alert('Deleted has error. Please contact admin!'));
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

