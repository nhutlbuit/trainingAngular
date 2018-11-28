import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UIService {

  baseAccountURL: string;
  baseOauthURL: string;

  // Observable string sources
  private navBarEventSource = new Subject<boolean>();

  // Observable string streams
  navBarEventStream$ = this.navBarEventSource.asObservable();

  constructor() { }

  announceNavBarEvent(eventVal: boolean) {
    this.navBarEventSource.next(eventVal);
  }
}
