import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, AfterViewInit {

  inputB: string;
  @Input() childMessage: string;

  @Output() messageEvent = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  sendMessage() {
    this.messageEvent.emit(this.inputB);
  }


}

