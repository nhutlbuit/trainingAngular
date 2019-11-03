import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UIService {

  baseAccountURL: string;
  baseOauthURL: string;
  isTest: boolean;
  isTestBehaviorSubject = new BehaviorSubject<boolean>(false);
  @Output() isTestEventEmiiter = new EventEmitter<boolean>(true);

  // Observable string sources
   navBarEventSource = new Subject<boolean>();

  // Observable string streams
  navBarEventStream$ = this.navBarEventSource.asObservable();

  constructor() { }

  announceNavBarEvent(eventVal: boolean) {
    this.navBarEventSource.next(eventVal);
    this.isTest = eventVal;
    this.isTestBehaviorSubject.next(eventVal);
    this.isTestEventEmiiter.emit(eventVal);
  }
}
