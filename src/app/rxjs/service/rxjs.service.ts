import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UIService } from '../../service/uiservice.service';

@Injectable()
export class RxjsService {

  private ROOT_URL;

  private changeEvent = new Subject<any>();
  public changeEventHandle$ = this.changeEvent.asObservable();

  dialogData: any;

  constructor(private httpClient: HttpClient, private uIService: UIService) {
    this.ROOT_URL = this.uIService.baseAccountURL;
  }

  filterUserNames(keys: Subject<any>): Observable<any> {
    return keys.pipe(debounceTime(400), distinctUntilChanged(), switchMap(key => this.findStudentNameOnlyByUserNameContaining(key, 0, 10)));
  }

  findStudentNameOnlyByUserNameContaining(name: string, page: number, size: number) {
    const url = this.ROOT_URL + `students/search/likeName?name=${name}&page=${page}&size=${size}&projection=InlineStudentNameOnly`;
    return this.httpClient.get(url);
  }

  findByUserNameContaining(name: string, page: number, size: number) {
    const url = this.ROOT_URL + `students/search/likeName?name=${name}&page=${page}&size=${size}&projection=InlineStudent`;
    return this.httpClient.get(url);
  }

  fetchClassCodes() {
    const url = this.ROOT_URL + `trainingClasses/search/fetchClassCodes?projection=InlineTrainingClassGetIdOnly`;
    return this.httpClient.get(url);
  }

  createdStudent(student: any) {
    const url = this.ROOT_URL + 'students';
    return this.httpClient.post(url, student);
  }

  updatedStudent(student: any) {
    const url = this.ROOT_URL + '/students/' + student.id;
    return this.httpClient.patch(url, student);
  }

  deleteStudent(student: any) {
    const url = this.ROOT_URL + '/students/' + student.id;
    return this.httpClient.delete(url);
  }
}
