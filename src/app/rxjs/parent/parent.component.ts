import { Component, OnInit, AfterViewInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from '../child/child.component';
import { MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatRippleModule, MatInput } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit, AfterViewInit {

  inputA: any;
  messageFromChild: string;
  constructor(private el: ElementRef) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  receiveMessage($event) {
    this.messageFromChild = $event;
  }

  clearMessage() {
    this.inputA = '';
  }

}
const modules = [
  FormsModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  BrowserModule,
  MatFormFieldModule,
  MatRippleModule
];

@NgModule({
  declarations: [ParentComponent, ChildComponent],
  imports: [...modules],
  exports: [...modules]
})
class ParentModule { }

