import { Component, OnInit, AfterViewInit, NgModule, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from '../child/child.component';
import { MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatRippleModule } from '@angular/material';
import { CommonModule } from '@angular/common';

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

@NgModule({
  imports: [...modules],
  exports: [...modules, ParentComponent],
  declarations: [ParentComponent, ChildComponent],
})
export class ParentModule {
  static components = {
    lazy: ParentComponent,
  };
}

