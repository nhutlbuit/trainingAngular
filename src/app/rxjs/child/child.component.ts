import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, AfterViewInit {

  public inputB: string;
  @Input() childMessage: string;

  @Output() messageEvent = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  clearMessage() {
    this.inputB = '';
  }

  sendMessage() {
    this.messageEvent.emit(this.inputB);
  }

}

