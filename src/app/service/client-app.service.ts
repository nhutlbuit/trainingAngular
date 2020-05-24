import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppInfo } from '../model/app-info';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { UIService } from './uiservice.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ClientAppService {

  private ROOT_URL;

  private changeEvent = new Subject<any>();
  public changeEventHandle$ = this.changeEvent.asObservable();

  dataChange: BehaviorSubject<AppInfo[]> = new BehaviorSubject<AppInfo[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, private uIService: UIService) {
    this.ROOT_URL = this.uIService.baseAccountURL;
  }

  get data(): AppInfo[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  findAllClientApps(): Observable<any> {
    return this.httpClient.get<any>(this.ROOT_URL + '/appInfoes');
  }

  addClientApp(appInfo: any): void {
    const serviceUrl = this.ROOT_URL + '/custom/appInfoes/';
    this.httpClient.post(serviceUrl, appInfo).subscribe(
      data => {
        this.dialogData = appInfo;
      },
      (err: HttpErrorResponse) => {
        console.log(err.name + ' ' + err.message);
      }
    );
  }

  updateClientApp(appInfo: AppInfo): void {
    const serviceUrl = this.ROOT_URL + '/custom/appInfoes/' + appInfo.id;
    this.httpClient.put(serviceUrl, appInfo).subscribe(
      data => {
        this.dialogData = appInfo;
      },
      (err: HttpErrorResponse) => {
        console.log(err.name + ' ' + err.message);
      }
    );
  }

  // Delete Client App by set isActive = 0
  deleteClientApp(id: string, isActive: number): Observable<any> {
    const serviceUrl = this.ROOT_URL + '/appInfoes/' + id;
    // const flag = isActive === 1 ? 0 : 1;
    return this.httpClient
      .patch(serviceUrl, { isActive: isActive === 1 ? 0 : 1 })
      .map(data => {
        this.changeEvent.next('delete');
      });
  }

  filterUserNames(keys: Subject<any>): Observable<any> {
    return keys.pipe(debounceTime(400), distinctUntilChanged(), switchMap(key => this.findByUserNameContaining(key, 0, 10)));
  }

  findByUserNameContaining(name: string, page: number, size: number) {
    const url = this.ROOT_URL + `students/search/likeName?name=${name}&page=${page}&size=${size}`;
    return this.httpClient.get(url);
  }
}
