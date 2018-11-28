import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventService {
  public closeDialogEventSource: EventEmitter<any>;
  public closeOutboundDialogs: EventEmitter<any>;

  constructor() {
    this.closeDialogEventSource = new EventEmitter<any>();
    this.closeOutboundDialogs = new EventEmitter<any>();
  }
}
