import { Component, OnInit, AfterViewInit, NgModule, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from '../child/child.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { LowerCase } from '../pipe/lower-case';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit, AfterViewInit {

  inputA: any;
  messageFromChild: string;
  exceptionTest = 'aa';
  title: string | null;
  fontSize: number;
  color: string;
  constructor(private el: ElementRef) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // this.exceptionTest = 'bb';
    /* RROR Error: ExpressionChangedAfterItHasBeenCheckedError:
    Expression has changed after it was checked. Previous value: 'aa'. Current value: 'bb'. */
  }

  receiveMessage($event) {
    this.messageFromChild = $event;
  }

  clearMessage() {
    this.inputA = '';
  }

  doSomething() {
    this.title = this.inputA ?? 'title undentify';
    return this.exceptionTest?.endsWith('a');
  }

}

const modules = [
  CommonModule,
  FormsModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatRippleModule
];

const routes: Routes = [
  {
    path: '',
    component: ParentComponent
  }];
@NgModule({
  imports: [...modules, RouterModule.forChild(routes)],
  exports: [...modules, ParentComponent],
  declarations: [ParentComponent, ChildComponent, LowerCase],
})
export class ParentModule {
  static components = {
    lazy: ParentComponent,
  };
}



